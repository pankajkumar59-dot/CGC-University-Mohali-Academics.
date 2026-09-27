import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { SEMESTER_RESULTS } from '../data/mockData';

interface ResultsViewProps {
  student: StudentProfile;
  onDownloadDMC: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  student,
  onDownloadDMC,
  onShowToast,
}) => {
  const [selectedSem, setSelectedSem] = useState<number>(3);

  const activeResult = SEMESTER_RESULTS.find((r) => r.semester === selectedSem) || SEMESTER_RESULTS[2];

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-[#1b365d] text-white shadow-sm flex items-center justify-between border border-white/10">
        <div>
          <span className="text-[9px] font-bold text-[#feae2c] uppercase tracking-wider">
            Cumulative Grade Point Average (CGPA)
          </span>
          <h2 className="text-3xl font-black mt-0.5 tracking-tight">{student.cgpa.toFixed(2)}</h2>
          <p className="text-[11px] text-[#87a0cd] mt-0.5">
            {student.transferredCredits} Earned PTU Credits • 0 Active Backlogs
          </p>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase border border-emerald-400/30">
            First Class Distinction
          </span>
          <p className="text-[11px] text-[#87a0cd] mt-1.5 font-medium">Batch Rank: Top 8%</p>
        </div>
      </div>

      {/* SGPA Semester Bar Chart */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#002046] uppercase tracking-wide">
            Semester SGPA Progression
          </h3>
          <span className="text-[10px] text-[#74777f]">Click bar to view grades</span>
        </div>

        <div className="flex items-end justify-around h-32 pt-3 border-b border-[#e5eeff]">
          {SEMESTER_RESULTS.map((res) => {
            const isSelected = selectedSem === res.semester;
            const isCurrent = res.semester === 4;
            const heightPx = isCurrent ? 60 : Math.round(((res.sgpa - 7.5) / 2.5) * 65) + 30;

            return (
              <div
                key={res.semester}
                onClick={() => {
                  setSelectedSem(res.semester);
                  onShowToast(`Viewing Semester ${res.semester} marks sheet`, 'analytics');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span
                  className={`text-[10px] font-bold transition-colors ${
                    isSelected ? 'text-[#835500]' : 'text-[#002046]'
                  }`}
                >
                  {isCurrent ? 'Active' : res.sgpa.toFixed(2)}
                </span>
                
                <div
                  className={`w-10 rounded-t transition-all duration-300 ${
                    isCurrent
                      ? 'border-2 border-dashed border-[#cbdbf5] bg-[#eff4ff]'
                      : isSelected
                      ? 'bg-[#feae2c] shadow-md scale-105'
                      : 'bg-[#dce9ff] group-hover:bg-[#cbdbf5]'
                  }`}
                  style={{ height: `${heightPx}px` }}
                ></div>

                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isSelected ? 'font-bold text-[#002046]' : 'text-[#74777f]'
                  }`}
                >
                  Sem {res.semester}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Grades Sheet */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#74777f]">
            Semester {selectedSem} Course Breakdown {selectedSem === 4 ? '(In Progress)' : ''}
          </h4>
          <span className="text-[10px] text-[#835500] font-bold">
            SGPA: {selectedSem === 4 ? 'Evaluating' : activeResult.sgpa.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          {activeResult.subjects.map((sub) => (
            <div
              key={sub.code}
              className="p-2.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between text-xs hover:border-[#feae2c] transition-colors"
            >
              <div className="min-w-0 pr-2">
                <p className="font-bold text-[#002046] truncate">{sub.name}</p>
                <span className="text-[10px] text-[#74777f]">
                  {sub.code} • {sub.credits} Credits • Internal: {sub.internalMarks}
                </span>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`px-2 py-0.5 rounded font-bold text-xs ${
                    sub.grade === 'O'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sub.grade === 'A+'
                      ? 'bg-blue-100 text-blue-800'
                      : sub.grade === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#e5eeff] text-[#002046]'
                  }`}
                >
                  {sub.grade}
                </span>
                {sub.gradePoints > 0 && (
                  <p className="text-[9px] text-[#74777f] mt-0.5 font-mono">
                    GP: {sub.gradePoints.toFixed(1)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download DMC Button */}
      <button
        onClick={onDownloadDMC}
        className="w-full py-3 rounded-xl bg-[#002046] text-white text-xs font-bold active:scale-95 hover:bg-[#1b365d] transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <span className="material-symbols-outlined text-[17px]">description</span>
        Download Official Provisional DMC (PDF)
      </button>

      {/* Security verification stamp */}
      <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-[10px] text-[#44474e] flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
          Digitally Signed by Controller of Examinations
        </span>
        <span className="font-mono text-[#835500]">PTU-VERIFIED-2024</span>
      </div>
    </section>
  );
};
