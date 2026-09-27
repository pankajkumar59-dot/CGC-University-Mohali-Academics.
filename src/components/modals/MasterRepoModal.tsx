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
      title: 'OS Linux Kernel Lab Manual (Ubuntu)',
      desc: 'Shell scripting, process fork(), semaphore implementation in C',
      size: '5.8 MB',
      type: 'Lab Manual',
      filename: 'OS_Linux_Kernel_Lab_Manual.pdf'
    },
    {
      title: 'DAA Algorithm Viva Voce Question Bank',
      desc: 'Top 75 faculty viva questions with concise one-liner model responses',
      size: '2.4 MB',
      type: 'Viva Bank',
      filename: 'DAA_Viva_Questions.pdf'
    },
    {
      title: 'DBMS MySQL & PL/SQL Query Cookbook',
      desc: 'Cursors, triggers, procedures, and complex nested queries for lab exam',
      size: '3.6 MB',
      type: 'Lab Codes',
      filename: 'DBMS_SQL_Cookbook.pdf'
    },
    {
      title: 'Design & Analysis of Algorithms Code Vault',
      desc: 'Clean C++/Java implementations of Knapsack, LCS, Dijkstra & Huffman',
      size: '4.2 MB',
      type: 'Source Codes',
      filename: 'DAA_Complete_Implementations.zip'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eff4ff]">
        <div className="p-3.5 bg-[#1b365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feae2c] text-[22px]">folder_special</span>
            <div>
              <h3 className="text-xs font-bold">CSE 4th Sem Master Vault</h3>
              <p className="text-[10px] text-[#87a0cd]">Faculty Handouts, Lab Manuals &amp; Codes</p>
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
            <p className="font-bold text-[#835500]">Compiled by Department of CSE</p>
            <p className="text-[10px] text-[#44474e] mt-0.5">
              Verified by Dr. Preetinder Kaur &amp; Prof. Hardeep Singh for Semester 4 (Sections A &amp; B).
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
          <span className="text-[10px] text-[#44474e]">Total Bundle Size: 16.0 MB</span>
          <button
            onClick={() => onDownload('CSE_Sem4_Complete_Vault_Bundle.zip', 'CSE 4th Sem Complete Vault Bundle')}
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
