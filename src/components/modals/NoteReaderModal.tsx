import React from 'react';
import { NoteFile } from '../../types';

interface NoteReaderModalProps {
  note: NoteFile | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (note: NoteFile) => void;
  onSaveOffline: (note: NoteFile) => void;
  onBookmark: (note: NoteFile) => void;
}

export const NoteReaderModal: React.FC<NoteReaderModalProps> = ({
  note,
  isOpen,
  onClose,
  onDownload,
  onSaveOffline,
  onBookmark,
}) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eff4ff]">
        {/* Header */}
        <div className="p-3.5 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#feae2c] text-[22px]">picture_as_pdf</span>
            <div className="min-w-0">
              <h3 className="text-xs font-bold truncate leading-tight">{note.title}</h3>
              <p className="text-[10px] text-[#87a0cd] truncate">{note.filename} • {note.fileSize}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close document"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3 text-xs text-[#0b1c30]">
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[11px] text-[#002046] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#835500] uppercase block text-[9px] tracking-wide">
                {note.tag || 'CGC VERIFIED HANDOUT'}
              </span>
              <p className="font-medium">Faculty: {note.author} • PTU Syllabus Grounded</p>
            </div>
            <span className="text-[10px] text-[#74777f] font-mono">{note.downloads.toLocaleString()} reads</span>
          </div>

          <div className="p-3.5 bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl font-mono text-[11px] text-[#0b1c30] whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
            {note.contentPreview || `Previewing document: ${note.title}\n\nContents verified by IKGPTU CSE Board.\nIncludes numerical illustrations, state transitions, and previous year examination keys.`}
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <span className="material-symbols-outlined text-[#835500] text-[18px] shrink-0 mt-0.5">school</span>
            <div>
              <p className="font-bold">Exam Tip for PTU MST-1:</p>
              <p className="text-amber-800 text-[10px] mt-0.5">
                Questions from this module commonly carry 8 to 10 marks in Section B. Always draw the process state queue and write algorithm pseudo-code.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-3 bg-[#e5eeff] border-t border-[#cbdbf5] flex items-center justify-between gap-2">
          <button
            onClick={() => onBookmark(note)}
            className="flex items-center gap-1 text-xs font-bold text-[#835500] hover:text-[#002046] px-2 py-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            Bookmark
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSaveOffline(note)}
              className="px-3 py-1.5 rounded-lg border border-[#002046] text-[#002046] text-xs font-bold hover:bg-white active:scale-95 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">cloud_download</span>
              Save Offline
            </button>
            <button
              onClick={() => onDownload(note)}
              className="px-3.5 py-1.5 rounded-lg bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
