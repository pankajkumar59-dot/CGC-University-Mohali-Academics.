import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { SUBJECT_ATTENDANCE } from '../data/mockData';

interface AttendanceViewProps {
  student: StudentProfile;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ student, onShowToast }) => {
  const [bunks, setBunks] = useState(0);
  const baseAttended = student.totalAttendedClasses;
  const baseTotal = student.totalHeldClasses;

  const currentTotal = baseTotal + bunks;
  const currentPct = ((baseAttended / currentTotal) * 100).toFixed(1);
  const numericPct = parseFloat(currentPct);

  // Maximum safe bunks before dropping below 75%
  // 75% = baseAttended / (baseTotal + maxBunks) => baseTotal + maxBunks = baseAttended / 0.75
  const maxSafeBunks = Math.max(0, Math.floor(baseAttended / 0.75 - baseTotal));
  const remainingSafe = Math.max(0, maxSafeBunks - bunks);

  const handleAdjustBunk = (delta: number) => {
    const nextVal = Math.max(0, bunks + delta);
    setBunks(nextVal);
    if (delta > 0) {
      onShowToast(`Simulating ${nextVal} bunked lecture(s)`, 'calculate');
    }
  };

  const handleReset = () => {
    setBunks(0);
    onShowToast('Bunk simulator reset to actual data', 'refresh');
  };

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Standing Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b365d] to-[#002046] text-white shadow-sm flex items-center justify-between border border-white/10">
        <div>
          <span className="text-[9px] font-bold text-[#feae2c] uppercase tracking-wider">
            Overall Cumulative Attendance
          </span>
          <h2 className="text-3xl font-black mt-0.5 tracking-tight text-white">{currentPct}%</h2>
          <p className="text-[11px] text-[#87a0cd] mt-0.5">
            {baseAttended} of {currentTotal} lectures • PTU Criteria: 75.0%
          </p>
        </div>

        <div className="text-right flex flex-col items-end">
          <div
            className={`px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-1 border ${
              numericPct >= 75
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                : 'bg-red-500/20 text-red-300 border-red-400/30'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {numericPct >= 75 ? 'verified' : 'warning'}
            </span>
            {numericPct >= 75 ? 'Safe Zone' : 'Shortage Risk'}
          </div>
          <span className="text-[10px] text-[#87a0cd] mt-1">
            Section: {student.section}
          </span>
        </div>
      </div>

      {/* Interactive Safe Bunk Calculator */}
      <div className="p-3.5 rounded-xl bg-white border-2 border-[#feae2c]/40 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#835500] text-[20px]">calculate</span>
            <h3 className="text-xs font-bold text-[#002046] uppercase tracking-wide">
              Interactive Bunk Simulator
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="text-[10px] text-[#835500] font-bold hover:underline"
          >
            Reset Simulator
          </button>
        </div>

        <p className="text-[11px] text-[#44474e]">
          Simulate missing upcoming lectures to project your new attendance margin:
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex flex-col items-center justify-center">
            <span className="text-[10px] text-[#74777f] font-semibold uppercase">
              Simulated Bunks
            </span>
            <div className="flex items-center gap-3 mt-1.5">
              <button
                onClick={() => handleAdjustBunk(-1)}
                className="w-7 h-7 rounded-full bg-white text-[#002046] font-bold border border-[#cbdbf5] hover:bg-[#dce9ff] active:scale-90 transition-transform shadow-xs"
                title="Decrease bunk"
              >
                -
              </button>
              <span className="text-base font-extrabold text-[#002046] w-6 text-center">
                {bunks}
              </span>
              <button
                onClick={() => handleAdjustBunk(1)}
                className="w-7 h-7 rounded-full bg-white text-[#002046] font-bold border border-[#cbdbf5] hover:bg-[#dce9ff] active:scale-90 transition-transform shadow-xs"
                title="Increase bunk"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[#74777f] font-semibold uppercase">
              Projected Attendance
            </span>
            <span
              className={`text-lg font-black mt-1 ${
                numericPct >= 75 ? 'text-[#002046]' : 'text-[#ba1a1a]'
              }`}
            >
              {currentPct}%
            </span>
          </div>
        </div>

        {numericPct < 75 ? (
          <div className="text-[11px] p-2.5 rounded-lg bg-red-50 text-red-900 border border-red-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-red-600 shrink-0">error</span>
            <div>
              <strong>Critical Warning:</strong> Projected attendance has fallen below 75%! You risk university detention from MST and End-term examinations.
            </div>
          </div>
        ) : (
          <div className="text-[11px] p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-emerald-600 shrink-0">check_circle</span>
            <div>
              You can safely miss up to <strong>{remainingSafe} more lectures</strong> across subjects and stay comfortably above the mandatory 75% cutoff.
            </div>
          </div>
        )}
      </div>

      {/* Subject Wise Breakdown */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#74777f]">
            Subject Wise Breakdown
          </h4>
          <span className="text-[10px] text-[#44474e]">Updated daily by Department ERP</span>
        </div>

        {SUBJECT_ATTENDANCE.map((subj) => (
          <div
            key={subj.code}
            className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-1.5 hover:border-[#feae2c] transition-colors"
          >
            <div className="flex justify-between items-center text-xs font-bold text-[#002046]">
              <span className="truncate pr-2">
                {subj.name} ({subj.code})
              </span>
              <span className="text-emerald-700 font-mono shrink-0">
                {subj.percentage}% ({subj.attended}/{subj.total})
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${subj.percentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#44474e] pt-0.5">
              <span>Faculty: {subj.faculty}</span>
              <span className="text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Can safely miss {subj.safeMiss} classes
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Policy Notice */}
      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs text-[#002046] flex items-start gap-2">
        <span className="material-symbols-outlined text-[#835500] text-[18px] shrink-0 mt-0.5">info</span>
        <div className="text-[11px] leading-relaxed">
          <strong className="block text-[#002046] font-bold">PTU Attendance Ordinance:</strong>
          75% overall attendance is strictly mandatory to generate admit cards. Medical certificates must be submitted to Block 3 HOD office within 3 days of leave.
        </div>
      </div>
    </section>
  );
};
