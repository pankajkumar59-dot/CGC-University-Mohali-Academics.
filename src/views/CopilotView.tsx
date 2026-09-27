import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, ChatMessage } from '../types';

interface CopilotViewProps {
  student: StudentProfile;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CopilotView: React.FC<CopilotViewProps> = ({ student, onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello ${student.name.split(' ')[0]}! I have your CGC University Mohali ${student.course} ${student.branch} (Semester ${student.semester}) curriculum (Foundations of AI & Python BTAI-101, Applied Mathematics - I BTAM-101, Engineering Physics BTPH-101) fully indexed under mentor ${student.mentor}. Ask any doubt, request Python derivations, or generate practice questions for your MST-1 exam!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleVoiceMode = () => {
    const nextState = !isVoiceActive;
    setIsVoiceActive(nextState);
    if (nextState) {
      onShowToast('CGC Voice Agent active: listening...', 'mic');
    } else {
      onShowToast('Voice mode paused', 'mic_off');
    }
  };

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Knowledge base for realistic PTU syllabus assistance
    setTimeout(() => {
      let reply = '';
      const lower = promptText.toLowerCase();

      if (lower.includes('heuristic') || lower.includes('a*') || lower.includes('python') || lower.includes('ai')) {
        reply = `**A* Heuristic Search & Python Implementation (BTAI-101):**
Taught by **Ms. Garima Singh Thakur** in Foundations of AI:

1. **Evaluation Function:**
   $$f(n) = g(n) + h(n)$$
   - $g(n)$: Actual path cost from initial state to node $n$.
   - $h(n)$: Admissible heuristic estimate of cheapest path from $n$ to goal ($h(n) \\le h^*(n)$).

2. **Admissibility & Optimality:**
   If $h(n)$ never overestimates the true remaining cost, A* tree search is guaranteed to return the optimal shortest path.

3. **Python Search Implementation:**
\`\`\`python
import heapq

def a_star_search(graph, start, goal, heuristic):
    pq = []
    heapq.heappush(pq, (heuristic[start], 0, start, [start]))
    visited = set()
    while pq:
        f, cost, current, path = heapq.heappop(pq)
        if current == goal:
            return path, cost
        if current in visited:
            continue
        visited.add(current)
        for neighbor, weight in graph[current].items():
            if neighbor not in visited:
                g = cost + weight
                h = heuristic[neighbor]
                heapq.heappush(pq, (g + h, g, neighbor, path + [neighbor]))
    return None, float('inf')
\`\`\`
**MST-1 Exam Note:** Ms. Garima Singh Thakur's Unit 1 test will feature state-space graphs and 8-puzzle heuristic calculations.`;
      } else if (lower.includes('peterson')) {
        reply = `**Peterson's Algorithm (Critical Section Solution):**
Peterson's algorithm is a classic software solution for 2-process mutual exclusion ($P_0$ and $P_1$) sharing two variables:
\`\`\`c
boolean flag[2] = {false, false};
int turn;

void enter_region(int process) {
    int other = 1 - process;
    flag[process] = true;
    turn = other;
    while (flag[other] == true && turn == other); // Busy wait
    // --- CRITICAL SECTION ---
    flag[process] = false;
}
\`\`\`
**Why it satisfies PTU evaluation criteria:**
1. **Mutual Exclusion:** Processes cannot enter simultaneously because \`turn\` cannot equal 0 and 1 simultaneously.
2. **Progress:** If other process doesn't want to enter, its flag is false, so waiting process enters immediately.
3. **Bounded Waiting:** A process waits at most one turn before getting access.`;
      } else if (lower.includes('daa') || lower.includes('10-mark') || lower.includes('mst')) {
        reply = `**Top 5 Repeated 10-Mark Questions for DAA (BTCS-402 MST-1):**

1. **Recurrence Solving:** State and prove Master Theorem cases. Solve $T(n) = 3T(n/4) + n\\log n$.
2. **Dynamic Programming vs Greedy:** Formulate the 0/1 Knapsack problem using dynamic programming tabular method ($O(nW)$) and contrast with Fractional Knapsack greedy approach.
3. **Longest Common Subsequence (LCS):** Write the dynamic programming recurrence and trace LCS for strings $X = \\text{"ABCBDAB"}$ and $Y = \\text{"BDCABA"}$.
4. **Divide & Conquer Analysis:** Prove the worst-case time complexity of QuickSort is $O(n^2)$ and show how randomized pivot or median-of-three yields $O(n\\log n)$.
5. **Minimum Spanning Trees:** Compare Prim's and Kruskal's algorithms with priority queues; demonstrate cycle detection via Disjoint Set Union (DSU).`;
      } else if (lower.includes('3nf') || lower.includes('bcnf')) {
        reply = `**3NF vs BCNF (Database Normalization Comparison):**

| Criterion | Third Normal Form (3NF) | Boyce-Codd Normal Form (BCNF) |
|---|---|---|
| **Condition for $X \\to Y$** | Either $X$ is a Super Key OR $Y$ is a Prime Attribute | $X$ **MUST** be a Super Key strictly |
| **Transitive Dependency** | Removed for non-prime attributes | Removed completely for all attributes |
| **Functional Dependency Preservation** | Always guaranteed | May not always be preserved |
| **Strictness** | Relaxed | Stricter subset of 3NF |

**Key PTU Viva Catch:** Every relation in BCNF is guaranteed to be in 3NF, but the converse is not true!`;
      } else if (lower.includes('banker')) {
        reply = `**Banker's Algorithm for Deadlock Avoidance (BTCS-401):**
Developed by Edsger Dijkstra, it tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources:
1. **Data Structures:**
   - \`Available[m]\`: Available instances of resource $R_j$.
   - \`Max[n][m]\`: Max demand of process $P_i$.
   - \`Allocation[n][m]\`: Currently allocated instances.
   - \`Need[n][m] = Max[n][m] - Allocation[n][m]\`.
2. **Safety Rule:** A state is safe if there exists a safe execution sequence $\\langle P_1, P_2, \\dots, P_n \\rangle$ such that for each $P_i$, $\\text{Need}_i \\le \\text{Work}$.`;
      } else {
        reply = `Regarding **"${promptText}"**:
In the IKGPTU Computer Science curriculum, this falls under core semester assessment. Key aspects to memorize:
- **Conceptual Definition:** Formulate the mathematical or architectural basis clearly.
- **PTU Presentation Style:** Always begin answers with a block diagram and a 3-bullet advantage list.
- **Reference Textbooks:** Galvin (OS), Cormen/CLRS (DAA), and Korth/Navathe (DBMS).

Would you like me to generate a 5-minute revision flashcard or a practice numerical for this topic?`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputText);
  };

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#002046] via-[#1b365d] to-[#002046] text-white shadow-sm flex items-start justify-between border border-white/10">
        <div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[8px] font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[12px]">auto_awesome</span> CGC PTU AI ASSISTANT
          </div>
          <h2 className="text-base sm:text-lg font-bold">CGC AI Copilot</h2>
          <p className="text-[11px] text-[#87a0cd]">Strictly grounded in I.K. Gujral PTU Syllabus</p>
        </div>

        <button
          onClick={toggleVoiceMode}
          className={`flex flex-col items-center p-2 rounded-xl text-xs border transition-all ${
            isVoiceActive
              ? 'bg-[#feae2c] text-[#6b4500] border-[#feae2c]'
              : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
          }`}
          title="Toggle Voice Mode"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isVoiceActive ? 'mic' : 'mic_none'}
          </span>
          <span className="text-[9px] font-bold mt-0.5">Voice Mode</span>
        </button>
      </div>

      {/* Active Voice Waveform Container */}
      {isVoiceActive && (
        <div className="p-3 rounded-xl bg-[#002046] text-white flex items-center justify-between border border-[#feae2c]/40 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-xs font-bold">
              Listening to {student.name} (CSE Sem {student.semester})...
            </span>
          </div>
          <div className="flex items-center gap-1 h-5">
            <span className="w-1 bg-[#feae2c] rounded-full v-bar"></span>
            <span className="w-1 bg-[#feae2c] rounded-full v-bar"></span>
            <span className="w-1 bg-[#feae2c] rounded-full v-bar"></span>
            <span className="w-1 bg-[#feae2c] rounded-full v-bar"></span>
          </div>
        </div>
      )}

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => handleSendPrompt("Explain A* Search heuristic evaluation function f(n) = g(n) + h(n)")}
          className="px-2.5 py-1.5 rounded-lg bg-white border border-[#cbdbf5] text-[11px] font-semibold text-[#002046] hover:border-[#835500] whitespace-nowrap shadow-xs shrink-0"
        >
          A* Search &amp; Python Heuristics
        </button>
        <button
          onClick={() => handleSendPrompt("Explain Peterson's algorithm critical section logic")}
          className="px-2.5 py-1.5 rounded-lg bg-white border border-[#cbdbf5] text-[11px] font-semibold text-[#002046] hover:border-[#835500] whitespace-nowrap shadow-xs shrink-0"
        >
          Peterson's Algorithm
        </button>
        <button
          onClick={() => handleSendPrompt('Give top 5 10-mark questions for DAA MST-1')}
          className="px-2.5 py-1.5 rounded-lg bg-white border border-[#cbdbf5] text-[11px] font-semibold text-[#002046] hover:border-[#835500] whitespace-nowrap shadow-xs shrink-0"
        >
          Top 5 DAA Questions
        </button>
        <button
          onClick={() => handleSendPrompt('Explain 3NF vs BCNF difference with table example')}
          className="px-2.5 py-1.5 rounded-lg bg-white border border-[#cbdbf5] text-[11px] font-semibold text-[#002046] hover:border-[#835500] whitespace-nowrap shadow-xs shrink-0"
        >
          3NF vs BCNF
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-3 min-h-[280px] max-h-[460px] overflow-y-auto pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 max-w-[95%] ${
                isUser ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#002046] flex items-center justify-center text-[#feae2c] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'rounded-tr-xs bg-[#002046] text-white shadow-sm'
                    : 'rounded-tl-xs bg-white border border-[#e5eeff] text-[#0b1c30] shadow-sm'
                }`}
              >
                {!isUser && (
                  <p className="font-bold text-[9px] text-[#835500] uppercase mb-1">
                    CGC Academic Assistant
                  </p>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 self-start">
            <div className="w-7 h-7 rounded-full bg-[#002046] flex items-center justify-center text-[#feae2c] shrink-0">
              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
            </div>
            <div className="p-3 rounded-2xl rounded-tl-xs bg-white border border-[#e5eeff] text-xs text-[#74777f] flex items-center gap-1.5">
              <span>Retrieving PTU syllabus reference</span>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center mt-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask any syllabus doubt, derivation, or formula..."
          className="w-full bg-white border border-[#cbdbf5] rounded-full pl-4 pr-20 py-2.5 text-xs text-[#002046] focus:outline-none focus:ring-2 focus:ring-[#002046] placeholder:text-[#74777f] shadow-xs"
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          <button
            type="button"
            onClick={toggleVoiceMode}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isVoiceActive ? 'text-[#835500] bg-[#feae2c]/20' : 'text-[#74777f] hover:text-[#835500]'
            }`}
            title="Toggle Mic"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
          <button
            type="submit"
            className="w-7 h-7 rounded-full bg-[#002046] text-white flex items-center justify-center hover:bg-[#1b365d] active:scale-90 transition-transform shadow-xs"
            title="Send query"
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
          </button>
        </div>
      </form>
    </section>
  );
};
