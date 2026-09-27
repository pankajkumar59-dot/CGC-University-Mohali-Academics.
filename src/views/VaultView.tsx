import React from 'react';
import { NoteFile } from '../types';

interface VaultViewProps {
  vaultNotes: NoteFile[];
  onOpenNoteReader: (note: NoteFile) => void;
  onRemoveFromVault: (noteId: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const VaultView: React.FC<VaultViewProps> = ({
  vaultNotes,
  onOpenNoteReader,
  onRemoveFromVault,
  onShowToast,
}) => {
  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">Offline Study Vault</h2>
          <p className="text-[11px] text-[#44474e]">Cached materials accessible during lab &amp; transit</p>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-xs font-semibold text-[#002046] border border-[#cbdbf5]">
          Storage: {(vaultNotes.length * 3.8).toFixed(1)} MB
        </span>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {vaultNotes.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#e5eeff]">
            <span className="material-symbols-outlined text-3xl text-[#74777f] mb-1">cloud_off</span>
            <p className="text-xs font-bold text-[#002046]">Your Offline Vault is empty</p>
            <p className="text-[11px] text-[#44474e] mt-0.5">
              Browse Notes &amp; Books and tap "Save Offline" to access study material without data.
            </p>
          </div>
        ) : (
          vaultNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-xl bg-white border border-[#e5eeff] flex items-center justify-between shadow-sm hover:border-[#feae2c] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#002046] text-[22px] shrink-0">
                  picture_as_pdf
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-[#002046] truncate">{note.filename}</h4>
                  <span className="text-[10px] text-[#835500] font-semibold">
                    {note.fileSize} • Saved Offline Cache
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenNoteReader(note)}
                  className="px-3 py-1.5 rounded-lg bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all shadow-xs"
                >
                  Open
                </button>
                <button
                  onClick={() => {
                    onRemoveFromVault(note.id);
                    onShowToast(`Removed ${note.filename} from Offline Vault`, 'delete');
                  }}
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] hover:bg-red-50 hover:text-red-700 text-[#74777f] flex items-center justify-center transition-colors"
                  title="Remove from vault"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sync Hint */}
      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs text-[#002046] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#835500] text-[18px]">offline_pin</span>
          <span className="text-[11px]">Vault documents update automatically whenever campus Wi-Fi connects.</span>
        </div>
      </div>
    </section>
  );
};
