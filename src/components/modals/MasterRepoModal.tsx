import React from 'react';

interface MasterRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (filename: string, title: string) => void;
  onPreview: (filename: string, title: string) => void;
}

export const MasterRepoModal: React.FC<MasterRepoModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  onPreview,
}) => {
  if (!isOpen) return null;

  const repoFiles = [
    {
      title: 'BTAI-101: AI Foundations & Python Code Repo (2026 Model)',
      desc: 'NumPy vectorization, A* search heuristics, state space models & Jupyter Notebooks',
      size: '6.4 MB',
      type: 'Source Codes',
      filename: 'BTAI101_AI_Python_Repo_2026.zip'
    },
    {
      title: 'BTAI-102: AI Lab Viva Voce Question Bank (2026 Model)',
      desc: '100 faculty viva questions with model answers compiled by Ms. Garima Singh Thakur',
      size: '2.8 MB',
      type: 'Viva Bank',
      filename: 'BTAI102_Viva_Question_Bank_2026.pdf'
    },
    {
      title: 'BTAM-101: Applied Mathematics-I Proofs & Calculus Cookbook',
      desc: 'Linear algebra, matrix diagonalization, multivariable calculus & Taylor expansions',
      size: '4.2 MB',
      type: 'Problem Bank',
      filename: 'BTAM101_Calculus_Cookbook_2026.pdf'
    },
    {
      title: 'BTPH-101: Quantum Computing Basics & Physics Lab Manual',
      desc: 'Quantum bits, Qubit superposition simulation & Hall Effect Lab calculations (2026 Scheme)',
      size: '3.9 MB',
      type: 'Lab Manual',
      filename: 'BTPH101_Quantum_Physics_Lab_2026.pdf'
    },
    {
      title: 'CGCU-2026: NEP 2026 FYUP Curriculum & Credit Scheme',
      desc: 'Official 4-Year B.Tech CSE (AIML) Credit Framework, Elective Matrix & Digilocker Mapping',
      size: '2.1 MB',
      type: 'NEP Scheme',
      filename: 'CGC_University_2026_Curriculum_Scheme.pdf'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eff4ff]">
        <div className="p-3.5 bg-[#1b365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feae2c] text-[22px]">folder_special</span>
            <div>
              <h3 className="text-xs font-bold">CGC University 2026 Master Repository</h3>
              <p className="text-[10px] text-[#87a0cd]">B.Tech CSE (AIML) • 2026 Academic Model Cloud Vault</p>
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
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[11px] text-[#002046]">
            <p className="font-bold text-[#835500]">CGC University 2026 Academic Model</p>
            <p className="text-[10px] text-[#44474e] mt-0.5">
              Verified by mentor Ms. Garima Singh Thakur &amp; Board of Studies for 1st Semester CSE (AIML).
            </p>
          </div>

          {repoFiles.map((file, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#f8f9ff] border border-[#cbdbf5] flex items-center justify-between gap-2.5 hover:border-[#feae2c] transition-colors"
            >
              <div
                className="min-w-0 cursor-pointer flex-1"
                onClick={() => onPreview(file.filename, file.title)}
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#feae2c] text-[#6b4500] text-[8px] font-bold uppercase">
                    {file.type}
                  </span>
                  <span className="text-[9px] text-[#74777f] font-mono">{file.size}</span>
                </div>
                <h4 className="text-xs font-bold text-[#002046] truncate mt-1">{file.title}</h4>
                <p className="text-[10px] text-[#44474e] truncate mt-0.5">{file.desc}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onPreview(file.filename, file.title)}
                  className="w-8 h-8 rounded-lg bg-[#e5eeff] text-[#002046] hover:bg-[#dce9ff] flex items-center justify-center"
                  title="Preview"
                >
                  <span className="material-symbols-outlined text-[17px]">visibility</span>
                </button>
                <button
                  onClick={() => onDownload(file.filename, file.title)}
                  className="w-8 h-8 rounded-lg bg-[#002046] text-white hover:bg-[#1b365d] active:scale-95 flex items-center justify-center shadow-sm"
                  title="Download"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#e5eeff] border-t border-[#cbdbf5] flex items-center justify-between text-xs">
          <span className="text-[10px] text-[#44474e]">Total Repository Bundle: 19.4 MB</span>
          <button
            onClick={() => onDownload('CGCU_2026_Model_CSE_AIML_Vault.zip', 'CGC University 2026 Model AIML Complete Vault')}
            className="px-3 py-1.5 rounded-lg bg-[#002046] text-white font-bold text-xs hover:bg-[#1b365d] active:scale-95 flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">archive</span>
            Download Entire Bundle
          </button>
        </div>
      </div>
    </div>
  );
};
