import React, { useState } from 'react';
import { SYLLABUS_COURSES } from '../data/mockData';

interface SyllabusViewProps {
  onDownloadScheme: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  onDownloadScheme,
  onShowToast,
}) => {
  const [activeSem, setActiveSem] = useState<number>(1);
  const [openCourse, setOpenCourse] = useState<string>('BTAI-101');

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleCourse = (code: string) => {
    setOpenCourse((prev) => (prev === code ? '' : code));
  };

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">CGC University 2026 Model Curriculum</h2>
          <p className="text-[11px] text-[#44474e]">B.Tech Computer Science &amp; Engineering (AI &amp; ML)</p>
        </div>
        <button
          onClick={onDownloadScheme}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] transition-all shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          2026 Scheme PDF
        </button>
      </div>

      {/* Semester Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {semesters.map((sem) => {
          const isSelected = activeSem === sem;
          const isCurrent = sem === 1;

          return (
            <button
              key={sem}
              onClick={() => {
                setActiveSem(sem);
                onShowToast(`Switched to Semester ${sem} 2026 Model syllabus view`, 'assignment');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#002046] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
              }`}
            >
              Sem {sem} {isCurrent ? '(Current)' : ''}
            </button>
          );
        })}
      </div>

      {/* Course Accordions */}
      <div className="space-y-2.5">
        {SYLLABUS_COURSES.map((course) => {
          const isOpen = openCourse === course.code;

          return (
            <div
              key={course.code}
              className="rounded-xl bg-white border border-[#e5eeff] shadow-sm overflow-hidden transition-colors"
            >
              {/* Accordion Head */}
              <div
                onClick={() => toggleCourse(course.code)}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#f8f9ff] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#1b365d] text-[#feae2c] flex items-center justify-center font-bold text-xs shrink-0">
                    {course.code.replace('BTCS-', '')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#002046] truncate">{course.name}</h4>
                    <p className="text-[10px] text-[#44474e]">
                      {course.code} • {course.credits} Credits • {course.completionPct}% Completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-[#835500]">
                    {course.completionPct}%
                  </span>
                  <span className="material-symbols-outlined text-[#74777f] transition-transform duration-200">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {/* Accordion Body */}
              {isOpen && (
                <div className="p-3.5 border-t border-[#e5eeff] bg-[#f8f9ff] flex flex-col gap-3 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#002046]">Overall Syllabus Progress:</span>
                    <span className="font-bold text-[#835500]">{course.completionPct}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#feae2c] transition-all duration-500"
                      style={{ width: `${course.completionPct}%` }}
                    ></div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {course.units.map((unit) => (
                      <div
                        key={unit.unitNumber}
                        className="p-2.5 rounded-lg bg-white border border-[#cbdbf5] flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#002046] text-xs">
                            Unit {unit.unitNumber}: {unit.title}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                              unit.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : unit.status === 'In Progress'
                                ? 'bg-[#feae2c]/20 text-[#835500]'
                                : 'bg-[#e5eeff] text-[#74777f]'
                            }`}
                          >
                            {unit.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {unit.topics.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#eff4ff] text-[#002046] px-1.5 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
