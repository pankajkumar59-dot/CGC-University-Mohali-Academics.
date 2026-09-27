import React, { useState } from 'react';
import { StudySession } from '../../types';

interface StudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (session: Omit<StudySession, 'id' | 'date'>) => void;
}

export const StudySessionModal: React.FC<StudySessionModalProps> = ({
  isOpen,
  onClose,
  onAddSession,
}) => {
  const [subject, setSubject] = useState('Operating Systems');
  const [subjectCode, setSubjectCode] = useState('BTCS-401');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState<string>('1.5');
  const [day, setDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Thu');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const subjectOptions = [
    { name: 'Operating Systems', code: 'BTCS-401' },
    { name: 'Design & Analysis of Algorithms', code: 'BTCS-402' },
    { name: 'Database Management Systems', code: 'BTCS-403' },
    { name: 'Discrete Mathematics', code: 'BTAM-401' },
    { name: 'Computer Organization & Architecture', code: 'BTCS-404' },
    { name: 'Universal Human Values', code: 'HSMC-122' },
    { name: 'PTU Solved PYQ Practice', code: 'PYQ-400' },
  ];

  const handleSubjectChange = (name: string) => {
    setSubject(name);
    const found = subjectOptions.find((s) => s.name === name);
    if (found) {
      setSubjectCode(found.code);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedDuration = parseFloat(duration);

    // Validation: prevent negative, zero, or non-numeric durations
    if (isNaN(parsedDuration)) {
      setError('Please enter a valid numeric duration.');
      return;
    }

    if (parsedDuration <= 0) {
      setError('Duration must be greater than 0. Negative or zero study hours are not allowed.');
      return;
    }

    if (parsedDuration > 16) {
      setError('Study duration cannot exceed 16 hours for a single session.');
      return;
    }

    const cleanTopic = topic.trim();
    if (!cleanTopic) {
      setError('Please provide a brief topic or chapter studied.');
      return;
    }

    // Valid: Add to academicGoal state
    onAddSession({
      subject,
      subjectCode,
      durationHours: parsedDuration,
      topic: cleanTopic,
      day,
    });

    // Reset form & close
    setTopic('');
    setDuration('1.5');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#eff4ff] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#feae2c]">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold">Log Study Session</h3>
              <p className="text-[10px] text-[#87a0cd]">Add hours towards your weekly Academic Goal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 text-xs text-[#0b1c30]">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0 mt-0.5">
                error
              </span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold text-[#002046] mb-1">
              Subject / Course <span className="text-red-500">*</span>
            </label>
            <select
              value={subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl px-3 py-2 text-xs text-[#002046] font-medium focus:outline-none focus:ring-2 focus:ring-[#002046]"
            >
              {subjectOptions.map((s) => (
                <option key={s.code} value={s.name}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Topic Field */}
          <div>
            <label className="block text-xs font-bold text-[#002046] mb-1">
              Topic / Chapter Covered <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Unit 3 Process Sync & Semaphores derivation"
              className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl px-3 py-2 text-xs text-[#002046] focus:outline-none focus:ring-2 focus:ring-[#002046] placeholder:text-[#74777f]"
              required
            />
          </div>

          {/* Duration & Day Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002046] mb-1">
                Duration (Hours) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="16"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl pl-3 pr-10 py-2 text-xs text-[#002046] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#002046]"
                  required
                />
                <span className="absolute right-3 top-2 text-[11px] text-[#74777f] font-medium pointer-events-none">
                  hrs
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002046] mb-1">Day of Week</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as any)}
                className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl px-3 py-2 text-xs text-[#002046] font-medium focus:outline-none focus:ring-2 focus:ring-[#002046]"
              >
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday (Today)</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
                <option value="Sun">Sunday</option>
              </select>
            </div>
          </div>

          {/* Quick Duration Pills */}
          <div>
            <span className="text-[10px] text-[#74777f] font-semibold block mb-1">
              Quick duration presets:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['0.5', '1.0', '1.5', '2.0', '3.0'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setDuration(preset);
                    if (error) setError('');
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                    duration === preset
                      ? 'bg-[#002046] text-white border-[#002046]'
                      : 'bg-[#eff4ff] text-[#002046] border-[#cbdbf5] hover:border-[#feae2c]'
                  }`}
                >
                  {preset} hrs
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#cbdbf5] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-[#eff4ff] text-[#002046] font-bold text-xs hover:bg-[#e5eeff] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#002046] text-white font-bold text-xs hover:bg-[#1b365d] active:scale-95 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              Save Study Hours
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
