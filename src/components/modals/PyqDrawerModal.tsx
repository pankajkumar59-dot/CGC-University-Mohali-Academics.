import React from 'react';

interface PyqDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (filename: string, title: string) => void;
  onPreview: (filename: string, title: string) => void;
}

export const PyqDrawerModal: React.FC<PyqDrawerModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  onPreview
}) => {
  if (!isOpen) return null;

  const pyqList = [
    {
      code: 'BTCS-401',
      subject: 'Operating Systems (Dec 2023 Solved)',
      desc: 'Section A, B & C fully solved with step-by-step Bankers algorithm & semaphores',
      size: '3.4 MB',
      filename: 'OS_Dec2023_Solved_PTU.pdf'
    },
    {
      code: 'BTCS-402',
      subject: 'Design & Analysis of Algorithms (May 2023 Solved)',
      desc: 'Recurrence relations & Dynamic Programming proofs with complexity derivations',
      size: '4.1 MB',
      filename: 'DAA_May2023_Solved_PTU.pdf'
    },
    {
      code: 'BTCS-403',
      subject: 'Database Management Systems (Dec 2022 Solved)',
      desc: 'Normalization 1NF to BCNF solved questions + SQL query tree optimization',
      size: '2.9 MB',
      filename: 'DBMS_Dec2022_Solved_PTU.pdf'
    },
    {
      code: 'BTAM-401',
      subject: 'Discrete Mathematics (May 2023 Solved)',
      desc: 'Graph coloring, Pigeonhole principle, and Euler/Hamiltonian paths',
      size: '3.1 MB',
      filename: 'Discrete_Math_May2023_PTU.pdf'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eff4ff]">
        <div className="p-3.5 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feae2c] text-[22px]">history_edu</span>
            <div>
              <h3 className="text-xs font-bold">PTU Solved PYQ Archive</h3>
              <p className="text-[10px] text-[#87a0cd]">Official Past Papers with Model Answers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3.5 overflow-y-auto space-y-2.5">
          <div className="p-2 rounded-lg bg-[#eff4ff] text-[11px] text-[#002046]">
            <strong>Pro Tip:</strong> 60%+ of PTU Mid-Term (MST) and End-Term paper patterns repeat from past 3 exam cycles.
          </div>

          {pyqList.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#f8f9ff] border border-[#cbdbf5] flex items-center justify-between gap-2.5 hover:border-[#835500] transition-colors"
            >
              <div
                className="min-w-0 cursor-pointer flex-1"
                onClick={() => onPreview(item.filename, item.subject)}
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#002046] text-[8px] font-bold">
                    {item.code}
                  </span>
                  <span className="text-[9px] text-[#835500] font-semibold">{item.size}</span>
                </div>
                <h4 className="text-xs font-bold text-[#002046] truncate mt-1">{item.subject}</h4>
                <p className="text-[10px] text-[#44474e] truncate mt-0.5">{item.desc}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onPreview(item.filename, item.subject)}
                  className="w-8 h-8 rounded-lg bg-[#e5eeff] text-[#002046] hover:bg-[#dce9ff] flex items-center justify-center"
                  title="Preview"
                >
                  <span className="material-symbols-outlined text-[17px]">visibility</span>
                </button>
                <button
                  onClick={() => onDownload(item.filename, item.subject)}
                  className="w-8 h-8 rounded-lg bg-[#002046] text-white hover:bg-[#1b365d] active:scale-95 flex items-center justify-center shadow-sm"
                  title="Download"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#f8f9ff] border-t border-[#cbdbf5] text-center">
          <p className="text-[10px] text-[#74777f]">Curated by CGC Academic Council & Subject Toppers</p>
        </div>
      </div>
    </div>
  );
};
