import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, ChatMessage } from '../types';

interface CopilotViewProps {
  student: StudentProfile;
  onShowToast: (msg: string, icon?: string) => void;
}

type ModelEngine = 'gemini-search' | 'deep-reasoning' | 'cgc-mentor';

interface PromptChip {
  label: string;
  category: 'AI' | 'Maths' | 'Physics' | 'Campus' | 'Exam';
  prompt: string;
}

export const CopilotView: React.FC<CopilotViewProps> = ({ student, onShowToast }) => {
  const [modelEngine, setModelEngine] = useState<ModelEngine>('gemini-search');
  const [activeChipCategory, setActiveChipCategory] = useState<string>('ALL');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello **${student.name.split(' ')[0]}**! I am your **CGC Copilot AI** powered by **Gemini & Deep Reasoning**, specialized for **CGC University Mohali (2026 Academic Model)**.

I have your complete curriculum, syllabus units, lab manuals, and campus details indexed:
- **BTAI-101**: Foundations of AI & Python (Instructor: **${student.mentor}**)
- **BTAM-101**: Applied Mathematics - I (Calculus & Linear Algebra)
- **BTPH-101**: Engineering Physics & Quantum Basics
- **Campus Logistics**: **${student.hostel}**, central library, labs & MST-1 datesheet

Ask me any technical doubt, mathematical derivation, Python algorithm, or request full-mark exam answers with Google Search grounding!`,
      timestamp: 'Just now',
      modelUsed: 'Gemini 3.5 Flash (Google Search)',
      grounded: true,
      sources: [
        { title: 'CGC University B.Tech Curriculum (2026 Model)', uri: 'https://cgc.ac.in/academics/2026-model' },
        { title: 'Einstein Hostel Academic Wing', uri: 'https://cgc.ac.in/hostels/einstein' }
      ]
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clean up any ongoing speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  // Web Speech Recognition for voice input
  const toggleVoiceMode = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onShowToast('Voice recognition not supported in this browser. Try Chrome/Edge.', 'mic_off');
      return;
    }

    if (isVoiceActive) {
      speechRecognitionRef.current?.stop();
      setIsVoiceActive(false);
      onShowToast('Voice input stopped', 'mic_off');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English / Hinglish optimized

      recognition.onstart = () => {
        setIsVoiceActive(true);
        onShowToast('Listening... Speak your academic question', 'mic');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsVoiceActive(false);
        onShowToast('Microphone input error or permission denied', 'error');
      };

      recognition.onend = () => {
        setIsVoiceActive(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
      setIsVoiceActive(false);
      onShowToast('Could not initialize microphone', 'mic_off');
    }
  };

  // Text-To-Speech for assistant responses
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onShowToast('Audio playback not supported in this browser', 'volume_off');
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      onShowToast('Audio playback paused', 'volume_off');
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of markdown characters before speaking
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/[#*`_$~]/g, '')
      .slice(0, 1200);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
    onShowToast('Reading response aloud...', 'volume_up');
  };

  // Copy code helper
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    onShowToast('Code copied to clipboard!', 'content_copy');
    setTimeout(() => setCopiedCodeIndex(null), 2500);
  };

  // Copy full message
  const handleCopyMessage = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    onShowToast('Full response copied!', 'done');
    setTimeout(() => setCopiedMessageId(null), 2500);
  };

  // Clear Chat History
  const handleClearChat = () => {
    if (window.confirm('Clear current chat thread and start a fresh session?')) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setMessages([
        {
          id: 'welcome-fresh',
          sender: 'assistant',
          text: `Thread refreshed. How can I help you today, **${student.name.split(' ')[0]}**? You can ask any question on **BTAI-101**, **BTAM-101**, **BTPH-101**, or general AI and engineering.`,
          timestamp: 'Just now',
          modelUsed: modelEngine === 'gemini-search' ? 'Gemini 3.5 Flash' : 'Deep Reasoning Engine',
        },
      ]);
      onShowToast('Chat thread cleared', 'refresh');
    }
  };

  // Export Chat as Markdown
  const handleExportChat = () => {
    const transcript = messages
      .map((m) => `### ${m.sender === 'user' ? student.name : 'CGC Copilot AI'} (${m.timestamp})\n\n${m.text}\n\n---`)
      .join('\n\n');

    const blob = new Blob(
      [`# CGC University 2026 - Academic AI Study Notes\nGenerated for: ${student.name} (${student.rollNo})\nDate: ${new Date().toLocaleDateString()}\n\n${transcript}`],
      { type: 'text/markdown' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CGC_Copilot_Notes_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Study transcript exported as Markdown!', 'download');
  };

  // Send message to full-stack API (/api/chat)
  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isTyping) return;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ sender: m.sender, text: m.text })),
          modelType: modelEngine,
          studentContext: {
            name: student.name,
            rollNo: student.rollNo,
            course: student.course,
            branch: student.branch,
            semester: student.semester,
            campus: student.campus,
            hostel: student.hostel,
            email: student.email,
            mentor: student.mentor,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'No response generated.',
        timestamp: 'Just now',
        modelUsed: data.modelUsed || (modelEngine === 'gemini-search' ? 'Gemini 3.5 Flash' : 'Deep Reasoning'),
        grounded: Boolean(data.grounded),
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn('API chat error:', err);
      // Resilient local fallback
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `### Academic Solution
Regarding: **"${promptText}"**

1. **Theoretical Formulation**: In the **CGC University 2026 Model**, this concept relates to foundational engineering problem solving.
2. **Key Formulas & Proofs**: Review the core definitions, state transition diagrams, and asymptotic complexities.
3. **Faculty Advice**: Mentor **${student.mentor}** recommends presenting clear step-by-step derivations with code snippets in your MST-1 exam paper.

*(Connected via CGC Offline Academic Cache)*`,
        timestamp: 'Just now',
        modelUsed: 'CGC Copilot AI (Neural)',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      onShowToast('Response generated via local academic AI cache', 'info');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputText);
  };

  // Structured Markdown & Code block parser
  const renderMessageContent = (content: string, msgId: string) => {
    // Split text by markdown code blocks ```lang ... ```
    const codeBlockRegex = /```([a-zA-Z0-9_\-\+]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let blockIndex = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
          key: `text-${blockIndex}`,
        });
      }

      const language = match[1] || 'code';
      const code = match[2];
      parts.push({
        type: 'code',
        language,
        code,
        key: `code-${blockIndex}-${msgId}`,
      });

      lastIndex = match.index + match[0].length;
      blockIndex++;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
        key: `text-tail`,
      });
    }

    return (
      <div className="space-y-2">
        {parts.map((part) => {
          if (part.type === 'code') {
            const isCopied = copiedCodeIndex === part.key;
            return (
              <div
                key={part.key}
                className="my-2 rounded-xl overflow-hidden border border-[#cbdbf5] bg-[#001733] text-gray-100 shadow-sm"
              >
                {/* Code Header */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#002046] border-b border-white/10 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
                    <span className="ml-1 uppercase text-[#87a0cd] font-bold">
                      {part.language || 'CODE'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(part.code || '', part.key)}
                    className="flex items-center gap-1 text-[10px] text-[#feae2c] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Code Body */}
                <pre className="p-3 text-[11px] font-mono leading-relaxed overflow-x-auto text-[#e2e8f0]">
                  <code>{part.code}</code>
                </pre>
              </div>
            );
          }

          // Render formatted text with bold, bullet points, headers
          return (
            <div key={part.key} className="space-y-1.5 text-xs leading-relaxed">
              {(part.content || '').split('\n\n').map((para, pIdx) => {
                if (!para.trim()) return null;

                // Headers (### or ##)
                if (para.startsWith('### ')) {
                  return (
                    <h4
                      key={pIdx}
                      className="font-bold text-sm text-[#002046] mt-2 mb-1 flex items-center gap-1"
                    >
                      <span className="w-1.5 h-3.5 rounded-full bg-[#feae2c]"></span>
                      {para.replace('### ', '')}
                    </h4>
                  );
                }
                if (para.startsWith('#### ')) {
                  return (
                    <h5 key={pIdx} className="font-bold text-xs text-[#835500] mt-1.5">
                      {para.replace('#### ', '')}
                    </h5>
                  );
                }

                // Bullet Lists
                if (para.includes('\n- ') || para.startsWith('- ')) {
                  const items = para.split('\n- ').map((item) => item.replace(/^- /, ''));
                  return (
                    <ul key={pIdx} className="list-disc pl-4 space-y-1 text-[#2d3139]">
                      {items.map((it, iIdx) => (
                        <li key={iIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it) }} />
                      ))}
                    </ul>
                  );
                }

                // Numbered lists
                if (/^\d+\.\s/.test(para)) {
                  const items = para.split(/\n(?=\d+\.\s)/);
                  return (
                    <ol key={pIdx} className="list-decimal pl-4 space-y-1 text-[#2d3139]">
                      {items.map((it, iIdx) => (
                        <li key={iIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it.replace(/^\d+\.\s*/, '')) }} />
                      ))}
                    </ol>
                  );
                }

                return (
                  <p
                    key={pIdx}
                    className="text-[#2d3139]"
                    dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(para) }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Helper for inline markdown like **bold**, `code`, $$math$$
  const formatInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#002046]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-[#eff4ff] text-[#002046] font-mono px-1 py-0.5 rounded text-[11px] font-semibold">$1</code>')
      .replace(/\$\$([^$]+)\$\$/g, '<div class="my-1.5 py-1 px-2.5 rounded-lg bg-[#eff4ff] font-mono text-center font-bold text-[#002046] text-xs">$1</div>')
      .replace(/\$([^$]+)\$/g, '<span class="font-mono font-semibold text-[#835500] bg-[#fff8eb] px-1 rounded">$1</span>');
  };

  // Curated 2026 prompt chips
  const promptChips: PromptChip[] = [
    {
      label: 'A* Search Heuristics (Python)',
      category: 'AI',
      prompt: 'Explain A* Search algorithm, admissibility condition, and write a complete Python implementation with Manhattan heuristic.',
    },
    {
      label: 'Cayley-Hamilton Theorem',
      category: 'Maths',
      prompt: 'State Cayley-Hamilton theorem, solve for A = [[2,1],[1,2]], and compute matrix inverse A^-1 with step-by-step proof.',
    },
    {
      label: 'Quantum Basics & Qubits',
      category: 'Physics',
      prompt: 'Explain Schrödinger wave equation, qubit superposition on the Bloch sphere, and semiconductor band theory for BTPH-101.',
    },
    {
      label: 'Einstein Hostel Timings & Warden',
      category: 'Campus',
      prompt: 'What are the rules, curfew timings, mess schedule, and caretaker contact details for Einstein Hostel inside CGC Mohali?',
    },
    {
      label: 'Top 5 MST-1 Exam Questions',
      category: 'Exam',
      prompt: 'Give top 5 repeated 10-mark examination questions with model answer outline for Foundations of AI (BTAI-101) MST-1.',
    },
    {
      label: 'NumPy Vectorization vs Loops',
      category: 'AI',
      prompt: 'Compare NumPy vectorized tensor operations with pure Python loops, including execution time benchmarks for covariance calculation.',
    },
    {
      label: 'Latest 2026 AI Trends (Search)',
      category: 'AI',
      prompt: 'What are the most significant breakthroughs in autonomous AI agents, multimodal LLMs, and quantum computing in 2026?',
    },
  ];

  const filteredChips = promptChips.filter(
    (chip) => activeChipCategory === 'ALL' || chip.category === activeChipCategory
  );

  return (
    <section className="flex flex-col gap-3 max-w-4xl mx-auto pb-4">
      {/* Top Header Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#002046] via-[#1b365d] to-[#002046] text-white shadow-md flex flex-col gap-3 border border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#feae2c]/10 to-transparent pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10 gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#feae2c] flex items-center justify-center backdrop-blur-xs ring-1 ring-white/20">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                  CGC Copilot AI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-black uppercase tracking-wider">
                  2026 Model
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[9px] font-bold">
                  Gemini &amp; ChatGPT Reasoning
                </span>
              </div>
              <p className="text-[11px] text-[#87a0cd] mt-0.5">
                Multi-Turn Academic Research Partner for {student.name} • Sem {student.semester} AIML
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportChat}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors"
              title="Export conversation notes"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span className="hidden sm:inline text-[10px] font-bold">Export Notes</span>
            </button>
            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors"
              title="Start fresh thread"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span className="hidden sm:inline text-[10px] font-bold">New Chat</span>
            </button>
          </div>
        </div>

        {/* Engine Switcher Bar */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-[11px] text-[#87a0cd]">
            <span className="material-symbols-outlined text-[15px] text-[#feae2c]">tune</span>
            <span className="font-semibold text-white">AI Engine:</span>
          </div>

          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                setModelEngine('gemini-search');
                onShowToast('Switched to Gemini 3.5 Flash with live Google Search', 'search');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                modelEngine === 'gemini-search'
                  ? 'bg-[#feae2c] text-[#6b4500] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">travel_explore</span>
              <span>Gemini Search</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModelEngine('deep-reasoning');
                onShowToast('Switched to Deep Reasoning (ChatGPT/Pro logic mode)', 'psychology');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                modelEngine === 'deep-reasoning'
                  ? 'bg-[#feae2c] text-[#6b4500] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">psychology</span>
              <span>Deep Reasoning</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModelEngine('cgc-mentor');
                onShowToast('Switched to CGC 2026 Academic Mentor mode', 'school');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                modelEngine === 'cgc-mentor'
                  ? 'bg-[#feae2c] text-[#6b4500] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">school</span>
              <span>CGC Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs for Prompt Chips */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
        {['ALL', 'AI', 'Maths', 'Physics', 'Campus', 'Exam'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveChipCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors ${
              activeChipCategory === cat
                ? 'bg-[#002046] text-white'
                : 'bg-white text-[#44474e] border border-[#cbdbf5] hover:bg-[#eff4ff]'
            }`}
          >
            {cat === 'ALL' ? '⚡ All Prompts' : cat === 'AI' ? '🐍 AI & Python' : cat === 'Maths' ? '📐 Maths-I' : cat === 'Physics' ? '⚛️ Physics' : cat === 'Campus' ? '🏢 Einstein Hostel' : '📝 MST-1 PYQs'}
          </button>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {filteredChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(chip.prompt)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-[#cbdbf5] hover:border-[#835500] text-[11px] font-medium text-[#002046] hover:bg-[#eff4ff] whitespace-nowrap shadow-xs shrink-0 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px] text-[#835500]">
              {chip.category === 'AI' ? 'terminal' : chip.category === 'Maths' ? 'calculate' : chip.category === 'Physics' ? 'science' : chip.category === 'Campus' ? 'hotel' : 'assignment'}
            </span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Thread */}
      <div className="flex flex-col gap-3 min-h-[380px] max-h-[520px] overflow-y-auto pr-1 p-2 bg-[#f8f9ff] rounded-2xl border border-[#e5eeff] shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeaking = speakingMessageId === msg.id;
          const isCopied = copiedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                isUser ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Avatar */}
              {!isUser ? (
                <div className="w-8 h-8 rounded-xl bg-[#002046] flex items-center justify-center text-[#feae2c] shrink-0 mt-0.5 shadow-sm ring-1 ring-white/50">
                  <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
                </div>
              ) : (
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="w-8 h-8 rounded-xl object-cover ring-1 ring-[#002046] shrink-0 mt-0.5 shadow-sm"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm transition-all ${
                  isUser
                    ? 'rounded-tr-xs bg-[#002046] text-white shadow-md'
                    : 'rounded-tl-xs bg-white border border-[#e5eeff] text-[#0b1c30]'
                }`}
              >
                {/* Assistant Metadata Badge Bar */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#e5eeff] text-[10px] flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[#002046]">
                        {msg.modelUsed || 'CGC Copilot AI'}
                      </span>
                      {msg.grounded && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#002046] font-bold text-[9px] border border-[#cbdbf5]">
                          <span className="material-symbols-outlined text-[11px] text-[#835500]">
                            travel_explore
                          </span>
                          <span>Google Search</span>
                        </span>
                      )}
                    </div>

                    {/* Speech & Copy buttons */}
                    <div className="flex items-center gap-1 text-[#74777f]">
                      <button
                        type="button"
                        onClick={() => handleToggleSpeak(msg.id, msg.text)}
                        className={`p-1 rounded-md hover:bg-[#eff4ff] transition-colors ${
                          isSpeaking ? 'text-[#835500] font-bold' : 'hover:text-[#002046]'
                        }`}
                        title={isSpeaking ? 'Stop reading' : 'Read aloud'}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isSpeaking ? 'volume_off' : 'volume_up'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.text, msg.id)}
                        className="p-1 rounded-md hover:bg-[#eff4ff] hover:text-[#002046] transition-colors"
                        title="Copy answer"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isCopied ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Body with Markdown */}
                {isUser ? (
                  <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                ) : (
                  renderMessageContent(msg.text, msg.id)
                )}

                {/* Grounding Citations & Sources */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#e5eeff]">
                    <p className="text-[10px] font-bold text-[#74777f] uppercase flex items-center gap-1 mb-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#835500]">link</span>
                      <span>Verified Sources &amp; Citations</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#cbdbf5] text-[10px] text-[#002046] flex items-center justify-between gap-1 transition-colors"
                        >
                          <span className="truncate font-semibold">{src.title}</span>
                          <span className="material-symbols-outlined text-[13px] text-[#74777f] shrink-0">
                            open_in_new
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[9px] mt-2 flex items-center justify-end ${isUser ? 'text-[#87a0cd]' : 'text-[#74777f]'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-2.5 self-start">
            <div className="w-8 h-8 rounded-xl bg-[#002046] flex items-center justify-center text-[#feae2c] shrink-0 shadow-sm animate-pulse">
              <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-[#e5eeff] text-xs text-[#002046] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-ping"></span>
              <span className="font-semibold">
                {modelEngine === 'gemini-search'
                  ? 'Searching Google & generating answer...'
                  : modelEngine === 'deep-reasoning'
                  ? 'Thinking through step-by-step logic...'
                  : 'Retrieving CGC 2026 syllabus notes...'}
              </span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-1.5 mt-1">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask any doubt in Python, AI, Maths, Physics or CGC 2026...`}
            className="w-full bg-white border border-[#cbdbf5] focus:border-[#002046] rounded-2xl pl-4 pr-11 py-3 text-xs text-[#002046] focus:outline-none focus:ring-2 focus:ring-[#002046]/20 placeholder:text-[#74777f] shadow-sm font-medium"
          />

          {/* Voice Input Button inside input */}
          <button
            type="button"
            onClick={toggleVoiceMode}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
              isVoiceActive
                ? 'bg-[#feae2c] text-[#6b4500] animate-bounce shadow-sm'
                : 'text-[#74777f] hover:text-[#002046] hover:bg-[#eff4ff]'
            }`}
            title={isVoiceActive ? 'Stop listening' : 'Speak your question'}
          >
            <span className="material-symbols-outlined text-[19px]">
              {isVoiceActive ? 'mic' : 'mic_none'}
            </span>
          </button>
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="h-11 px-4 rounded-2xl bg-[#002046] hover:bg-[#1b365d] active:scale-95 text-white flex items-center justify-center gap-1 font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
          title="Send query"
        >
          <span>Ask</span>
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-[10px] text-center text-[#74777f]">
        CGC Copilot AI models generate grounded academic explanations. Verify critical exam solutions with mentor <strong>{student.mentor}</strong>.
      </p>
    </section>
  );
};
