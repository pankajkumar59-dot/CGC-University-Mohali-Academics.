import React from 'react';
import { StudentProfile } from '../types';

interface AcademicMobilityViewProps {
  student: StudentProfile;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AcademicMobilityView: React.FC<AcademicMobilityViewProps> = ({
  student,
  onShowToast,
}) => {
  const handleCopyAbc = () => {
    navigator.clipboard?.writeText(student.abcId);
    onShowToast(`Copied DigiLocker ABC ID: ${student.abcId}`, 'content_copy');
  };

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#002046] to-[#1b365d] text-white shadow-sm flex flex-col gap-1 border border-white/10">
        <span className="text-[9px] font-bold text-[#feae2c] uppercase tracking-wider">
          CGC University 2026 Academic Mobility Model
        </span>
        <h2 className="text-base sm:text-lg font-bold">NEP 2026 Academic Bank of Credits (ABC)</h2>
        <p className="text-[11px] text-[#87a0cd]">
          Digital credit mapping across CGC University Mohali campuses, IIT/NPTEL portals &amp; SWAYAM.
        </p>
      </div>

      {/* DigiLocker ABC ID Card */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#74777f] uppercase font-semibold">
              DigiLocker ABC Account ID
            </span>
            <p className="text-sm font-bold text-[#002046] font-mono tracking-wider">
              {student.abcId}
            </p>
          </div>
          <button
            onClick={handleCopyAbc}
            className="px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#002046] text-[11px] font-bold flex items-center gap-1 border border-[#cbdbf5] transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">content_copy</span>
            Copy ID
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-[#e5eeff] text-xs">
          <div className="p-2.5 rounded-lg bg-[#f8f9ff]">
            <span className="text-[10px] text-[#74777f] block">Verified ABC Credits</span>
            <p className="font-extrabold text-[#002046] text-sm mt-0.5">
              {student.transferredCredits}.0 / {student.requiredCredits}
            </p>
            <div className="w-full bg-[#e5eeff] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#002046] h-full rounded-full"
                style={{ width: `${(student.transferredCredits / student.requiredCredits) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#f8f9ff]">
            <span className="text-[10px] text-[#74777f] block">NPTEL / MOOC Transfer</span>
            <p className="font-extrabold text-emerald-700 text-sm mt-0.5">
              {student.nptelCredits} Credits Approved
            </p>
            <span className="text-[9px] text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded font-semibold inline-block mt-1">
              IIT Kharagpur Cloud Cert
            </span>
          </div>
        </div>
      </div>

      {/* Pathways */}
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#74777f]">
          Active Transfer Pathways &amp; Exchanges
        </h4>

        {/* Pathway 1 */}
        <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-1.5 hover:border-[#feae2c] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#002046]">
              CGC Landran &harr; Jhanjeri Semester Exchange
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              Eligible
            </span>
          </div>
          <p className="text-[11px] text-[#44474e]">
            Eligible for elective robotics and drone engineering lab courses at CGC Jhanjeri Tech Tower for Semester 5.
          </p>
          <button
            onClick={() => onShowToast('Semester 5 Mobility request submitted to Dean Office!', 'swap_horiz')}
            className="text-xs font-bold text-[#835500] inline-flex items-center gap-1 mt-1 hover:underline w-fit"
          >
            Apply for Sem 5 Campus Mobility &rarr;
          </button>
        </div>

        {/* Pathway 2 */}
        <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-1.5 hover:border-[#feae2c] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#002046]">
              SWAYAM / NPTEL MOOC Credit Transfer
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#002046] font-bold">
              Open Portal
            </span>
          </div>
          <p className="text-[11px] text-[#44474e]">
            Map completed 12-week IIT Kharagpur 'Cloud Computing &amp; Distributed Systems' certificate to replace Open Elective-1.
          </p>
          <button
            onClick={() => onShowToast('NPTEL certificate submitted for verification to Dean Academics!', 'task_alt')}
            className="text-xs font-bold text-[#835500] inline-flex items-center gap-1 mt-1 hover:underline w-fit"
          >
            Submit NPTEL Certificate &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
