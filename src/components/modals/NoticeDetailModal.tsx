import React from 'react';
import { NoticeItem } from '../../types';

interface NoticeDetailModalProps {
  notice: NoticeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadAttachment: (filename: string, title: string) => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  isOpen,
  onClose,
  onDownloadAttachment,
}) => {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eff4ff]">
        <div className="p-3.5 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feae2c] text-[20px]">campaign</span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#feae2c]">Official University Notice</h3>
              <p className="text-[10px] text-[#87a0cd] font-mono">{notice.refNo}</p>
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

        <div className="p-4 overflow-y-auto space-y-3 text-xs text-[#0b1c30]">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#002046] font-bold text-[10px]">
              {notice.category} Wing
            </span>
            <span className="text-[11px] text-[#74777f]">{notice.date}</span>
          </div>

          <h2 className="text-sm font-extrabold text-[#002046] leading-snug">{notice.title}</h2>

          <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#cbdbf5] text-[12px] leading-relaxed text-[#0b1c30]">
            <p>{notice.description}</p>
            <div className="mt-3 pt-2.5 border-t border-[#cbdbf5] text-[10px] text-[#44474e] flex flex-col gap-0.5">
              <p>Issued by: Office of the Dean Academics &amp; Controller of Examinations</p>
              <p>Campus: Chandigarh Group of Colleges, Landran &amp; Jhanjeri Campuses</p>
            </div>
          </div>

          {notice.attachmentName && (
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#002046] text-[22px]">picture_as_pdf</span>
                <div className="min-w-0">
                  <p className="font-bold text-xs text-[#002046] truncate">{notice.attachmentName}</p>
                  <p className="text-[10px] text-[#74777f]">Official PDF Document Attachment</p>
                </div>
              </div>
              <button
                onClick={() => onDownloadAttachment(notice.attachmentName!, notice.title)}
                className="px-3 py-1.5 rounded-lg bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 flex items-center gap-1 shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
                Download
              </button>
            </div>
          )}
        </div>

        <div className="p-3 bg-[#f8f9ff] border-t border-[#cbdbf5] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#e5eeff] text-[#002046] font-bold text-xs hover:bg-[#dce9ff]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
