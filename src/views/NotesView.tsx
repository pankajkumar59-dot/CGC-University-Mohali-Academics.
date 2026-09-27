import React, { useState } from 'react';
import { NoteFile } from '../types';

interface NotesViewProps {
  notes: NoteFile[];
  onOpenNoteReader: (note: NoteFile) => void;
  onTriggerDownload: (filename: string, title?: string) => void;
  onNavigateToVault: () => void;
  offlineCount: number;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onOpenNoteReader,
  onTriggerDownload,
  onNavigateToVault,
  offlineCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'OS' | 'DAA' | 'DBMS' | 'PYQ' | 'MATHS'>('ALL');

  const categories: Array<'ALL' | 'OS' | 'DAA' | 'DBMS' | 'PYQ' | 'MATHS'> = [
    'ALL',
    'OS',
    'DAA',
    'DBMS',
    'PYQ',
    'MATHS',
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesCategory = activeCategory === 'ALL' || note.subjectCategory === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      note.title.toLowerCase().includes(q) ||
      note.description.toLowerCase().includes(q) ||
      note.author.toLowerCase().includes(q) ||
      note.tag.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">Notes &amp; Study Vault</h2>
          <p className="text-[11px] text-[#44474e]">Verified Faculty Handouts &amp; PTU Topper Notes</p>
        </div>
        <button
          onClick={onNavigateToVault}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#dce9ff] text-[#002046] text-xs font-bold hover:bg-[#feae2c] hover:text-[#6b4500] transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">folder_special</span>
          Vault ({offlineCount})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#74777f] text-[18px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search OS, DAA, DBMS, PTU papers..."
          className="w-full bg-white border border-[#cbdbf5] rounded-xl pl-9 pr-8 py-2 text-xs text-[#002046] focus:outline-none focus:ring-2 focus:ring-[#002046] placeholder:text-[#74777f] shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-2.5 text-[#74777f] hover:text-[#002046]"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#002046] text-white shadow-xs'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            {cat === 'ALL' ? 'All Materials' : cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="space-y-2.5">
        {filteredNotes.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#e5eeff]">
            <span className="material-symbols-outlined text-3xl text-[#74777f] mb-1">search_off</span>
            <p className="text-xs font-bold text-[#002046]">No notes found matching "{searchQuery}"</p>
            <p className="text-[11px] text-[#44474e] mt-0.5">Try searching for OS, DAA, or DBMS</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-2.5 hover:border-[#feae2c] transition-colors"
            >
              <div
                className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                onClick={() => onOpenNoteReader(note)}
              >
                <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex flex-col items-center justify-center text-[#002046] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    {note.subjectCategory === 'DAA'
                      ? 'code'
                      : note.subjectCategory === 'DBMS'
                      ? 'database'
                      : note.subjectCategory === 'PYQ'
                      ? 'history_edu'
                      : 'picture_as_pdf'}
                  </span>
                  <span className="text-[8px] font-bold text-[#835500]">{note.fileSize}</span>
                </div>

                <div className="min-w-0">
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#002046] uppercase">
                    {note.tag}
                  </span>
                  <h4 className="text-xs font-bold text-[#002046] truncate mt-0.5">{note.title}</h4>
                  <p className="text-[10px] text-[#44474e] truncate">{note.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onOpenNoteReader(note)}
                  className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#002046] flex items-center justify-center transition-colors"
                  title="Read Document"
                >
                  <span className="material-symbols-outlined text-[17px]">visibility</span>
                </button>
                <button
                  onClick={() => onTriggerDownload(note.filename, note.title)}
                  className="w-8 h-8 rounded-full bg-[#002046] hover:bg-[#1b365d] active:scale-90 text-white flex items-center justify-center transition-all shadow-xs"
                  title="Download PDF"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
