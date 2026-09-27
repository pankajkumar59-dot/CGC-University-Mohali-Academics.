import React, { useState } from 'react';
import { AcademicGoal, StudySession } from '../types';

interface AcademicGoalsCardProps {
  goal: AcademicGoal;
  onUpdateTargetHours: (newTarget: number) => void;
  onLogStudySession: (session: Omit<StudySession, 'id' | 'date'>) => void;
  onResetWeeklySessions: () => void;
  onOpenStudySessionModal: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AcademicGoalsCard: React.FC<AcademicGoalsCardProps> = ({
  goal,
  onUpdateTargetHours,
  onLogStudySession,
  onResetWeeklySessions,
  onOpenStudySessionModal,
  onShowToast,
}) => {
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [customTarget, setCustomTarget] = useState(goal.weeklyTargetHours);

  const targetHours = Math.max(1, goal.weeklyTargetHours);
  const completedHours = Number(goal.completedHours.toFixed(1));
  const progressPct = Math.min(100, Math.round((completedHours / targetHours) * 100));
  const remainingHours = Number(Math.max(0, targetHours - completedHours).toFixed(1));

  // Compute daily hours for Mon - Sun
  const daysOrder: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'> = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  ];

  const dailyMap: Record<string, number> = {
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
  };

  goal.sessions.forEach((s) => {
    if (dailyMap[s.day] !== undefined) {
      dailyMap[s.day] += s.durationHours;
    }
  });

  // Compute subject breakdown
  const subjectMap: Record<string, number> = {};
  goal.sessions.forEach((s) => {
    subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.durationHours;
  });

  const handleSaveTarget = () => {
    if (customTarget > 0) {
      onUpdateTargetHours(customTarget);
      setIsEditingTarget(false);
      onShowToast(`Weekly study target updated to ${customTarget} hours!`, 'track_changes');
    }
  };

  const handleQuickAdd = (subjName: string, subjCode: string, hrs: number, tName: string) => {
    onLogStudySession({
      subject: subjName,
      subjectCode: subjCode,
      durationHours: hrs,
      day: 'Thu',
      topic: tName,
    });
    onShowToast(`+${hrs}h logged for ${subjName}!`, 'alarm_on');
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-3 transition-all hover:border-[#feae2c]/60">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#002046] flex items-center justify-center shrink-0 border border-[#cbdbf5]">
            <span className="material-symbols-outlined text-[19px] text-[#835500]">track_changes</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xs font-bold text-[#002046] uppercase tracking-wide">
                Academic Goals &amp; Study Hours
              </h3>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#feae2c] text-[#6b4500] font-bold">
                Weekly Target
              </span>
            </div>
            <p className="text-[10px] text-[#44474e]">Track dedicated self-study against weekly target</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsEditingTarget(!isEditingTarget)}
            className="text-[11px] font-bold text-[#835500] hover:text-[#002046] px-2 py-1 rounded bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors flex items-center gap-0.5"
            title="Adjust target hours"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>{isEditingTarget ? 'Close' : 'Set Goal'}</span>
          </button>
        </div>
      </div>

      {/* Target Setting Drawer / Controls */}
      {isEditingTarget && (
        <div className="p-3 rounded-lg bg-[#f8f9ff] border border-[#cbdbf5] flex flex-col gap-2.5 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#002046]">Configure Weekly Study Target:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomTarget((prev) => Math.max(5, prev - 2))}
                className="w-6 h-6 rounded-full bg-white border border-[#cbdbf5] text-[#002046] font-bold flex items-center justify-center hover:bg-[#e5eeff]"
              >
                -
              </button>
              <span className="font-black text-sm text-[#002046] font-mono">{customTarget} hrs</span>
              <button
                onClick={() => setCustomTarget((prev) => Math.min(60, prev + 2))}
                className="w-6 h-6 rounded-full bg-white border border-[#cbdbf5] text-[#002046] font-bold flex items-center justify-center hover:bg-[#e5eeff]"
              >
                +
              </button>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#74777f]">Presets:</span>
            {[15, 20, 25, 30].map((val) => (
              <button
                key={val}
                onClick={() => setCustomTarget(val)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  customTarget === val
                    ? 'bg-[#002046] text-white border-[#002046]'
                    : 'bg-white text-[#002046] border-[#cbdbf5] hover:border-[#feae2c]'
                }`}
              >
                {val}h / week
              </button>
            ))}
            <button
              onClick={handleSaveTarget}
              className="ml-auto px-3 py-1 rounded bg-[#002046] text-white font-bold text-xs hover:bg-[#1b365d] active:scale-95 shadow-xs"
            >
              Save Goal
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar Component linked to Study Hours */}
      <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-[#002046] tracking-tight">
              {completedHours}
            </span>
            <span className="text-xs text-[#74777f]">/ {targetHours}.0 hrs</span>
            <span className="text-[10px] text-[#835500] font-bold ml-1">
              ({progressPct}%)
            </span>
          </div>

          {progressPct >= 100 ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">military_tech</span>
              Goal Achieved!
            </span>
          ) : progressPct >= 70 ? (
            <span className="px-2 py-0.5 rounded-full bg-[#feae2c]/20 text-[#835500] text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
              On Track ({remainingHours}h to go)
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#002046] text-[10px] font-bold">
              {remainingHours}h remaining
            </span>
          )}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#e5eeff] overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              progressPct >= 100
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-[#feae2c] to-[#835500]'
            }`}
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        {/* Daily Study Hours Distribution Bar Chart */}
        <div className="pt-2 border-t border-[#cbdbf5]/50 flex items-end justify-between text-center gap-1">
          {daysOrder.map((d) => {
            const h = dailyMap[d];
            const maxDayHeight = 36;
            const barHeight = Math.max(4, Math.min(maxDayHeight, Math.round((h / 5) * maxDayHeight)));
            const isToday = d === 'Thu';

            return (
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-[#74777f]">
                  {h > 0 ? `${h}h` : '-'}
                </span>
                <div
                  className={`w-full max-w-[20px] rounded-t transition-all ${
                    h > 0
                      ? isToday
                        ? 'bg-[#feae2c] shadow-xs'
                        : 'bg-[#1b365d]'
                      : 'bg-[#e5eeff]'
                  }`}
                  style={{ height: `${barHeight}px` }}
                ></div>
                <span
                  className={`text-[9px] ${
                    isToday ? 'font-bold text-[#002046]' : 'text-[#74777f]'
                  }`}
                >
                  {d}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Wise Hours Distribution */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {Object.entries(subjectMap).map(([subj, hrs]) => (
          <div
            key={subj}
            className="px-2 py-1 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[10px] text-[#002046] flex items-center gap-1 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#835500]"></span>
            <span className="font-semibold truncate max-w-[120px]">{subj}</span>
            <span className="font-mono font-bold text-[#835500]">{hrs.toFixed(1)}h</span>
          </div>
        ))}
      </div>

      {/* Interactive Actions & Quick Logging */}
      <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-[#74777f] uppercase">Quick Log:</span>
          <button
            onClick={() => handleQuickAdd('Foundations of AI & Python', 'BTAI-101', 1.0, 'A* Heuristics & State Space')}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#eff4ff] border border-[#cbdbf5] text-[10px] font-bold text-[#002046] transition-colors"
          >
            +1h AI &amp; Python
          </button>
          <button
            onClick={() => handleQuickAdd('Applied Mathematics - I', 'BTAM-101', 1.5, 'Linear Algebra & Eigenvalues')}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#eff4ff] border border-[#cbdbf5] text-[10px] font-bold text-[#002046] transition-colors"
          >
            +1.5h Maths-I
          </button>
          <button
            onClick={() => handleQuickAdd('Engineering Physics', 'BTPH-101', 1.0, 'Quantum Mechanics & Qubits')}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#eff4ff] border border-[#cbdbf5] text-[10px] font-bold text-[#002046] transition-colors"
          >
            +1h Physics
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onOpenStudySessionModal}
            className="px-3 py-1.5 rounded-lg bg-[#002046] text-white font-bold text-xs hover:bg-[#1b365d] active:scale-95 transition-all shadow-xs flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            Log Study Session
          </button>
          <button
            onClick={() => {
              onResetWeeklySessions();
              onShowToast('Weekly study hours reset for new cycle', 'restart_alt');
            }}
            className="w-7 h-7 rounded-lg text-[#74777f] hover:text-[#ba1a1a] hover:bg-red-50 flex items-center justify-center transition-colors"
            title="Reset weekly study hours"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
