import React, { useState } from 'react';
import { NoticeItem } from '../types';

interface NotificationsViewProps {
  notices: NoticeItem[];
  onOpenNotice: (notice: NoticeItem) => void;
  onMarkAllRead: () => void;
  onDownloadAttachment: (filename: string, title: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notices,
  onOpenNotice,
  onMarkAllRead,
  onDownloadAttachment,
}) => {
  const [filter, setFilter] = useState<'All' | 'Exam' | 'Placement' | 'Clubs' | 'Academic'>('All');

  const filteredNotices = notices.filter(
    (n) => filter === 'All' || n.category === filter
  );

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">Official Notice Board</h2>
          <p className="text-[11px] text-[#44474e]">Circulars from Landran &amp; Jhanjeri Campuses</p>
        </div>
        <button
          onClick={onMarkAllRead}
          className="text-xs font-bold text-[#835500] hover:underline"
        >
          Mark All Read
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'Exam', 'Placement', 'Clubs', 'Academic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-[#002046] text-white shadow-xs'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-2.5">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-3.5 rounded-xl border transition-all ${
              notice.priority === 'high'
                ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                : 'bg-white border-[#e5eeff]'
            } shadow-sm hover:border-[#feae2c] flex flex-col gap-1.5`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  notice.priority === 'high'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : 'bg-[#eff4ff] text-[#002046]'
                }`}
              >
                {notice.category} Branch
              </span>
              <div className="flex items-center gap-1.5">
                {!notice.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                )}
                <span className="text-[9px] text-[#74777f]">{notice.date}</span>
              </div>
            </div>

            <h4
              onClick={() => onOpenNotice(notice)}
              className="font-bold text-xs text-[#002046] cursor-pointer hover:text-[#835500] transition-colors leading-snug"
            >
              {notice.title}
            </h4>

            <p className="text-[10px] text-[#44474e] line-clamp-2">{notice.description}</p>

            <div className="pt-1.5 border-t border-[#cbdbf5]/50 flex items-center justify-between text-xs">
              {notice.attachmentName ? (
                <button
                  onClick={() => onDownloadAttachment(notice.attachmentName!, notice.title)}
                  className="text-xs font-bold text-[#002046] inline-flex items-center gap-1 hover:text-[#835500] transition-colors"
                >
                  Download Schedule <span className="material-symbols-outlined text-[15px]">download</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenNotice(notice)}
                  className="text-xs font-bold text-[#002046] inline-flex items-center gap-1 hover:text-[#835500]"
                >
                  Read Full Notice &rarr;
                </button>
              )}

              <span className="text-[9px] text-[#835500] font-semibold font-mono">
                Ref: {notice.refNo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
