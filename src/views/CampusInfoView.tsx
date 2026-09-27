import React from 'react';
import { CAMPUS_DIRECTORY } from '../data/mockData';

interface CampusInfoViewProps {
  onDownloadBusRoutes: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CampusInfoView: React.FC<CampusInfoViewProps> = ({
  onDownloadBusRoutes,
  onShowToast,
}) => {
  const handleCopyContact = (phone: string, name: string) => {
    navigator.clipboard?.writeText(phone);
    onShowToast(`Copied ${name} contact: ${phone}`, 'phone');
  };

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">Campus Guide &amp; Directory</h2>
          <p className="text-[11px] text-[#44474e]">CGC Landran &amp; Jhanjeri Campuses</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-bold">
          Mohali Quad
        </span>
      </div>

      {/* Directory Cards */}
      <div className="space-y-2.5">
        {CAMPUS_DIRECTORY.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-start gap-3 hover:border-[#feae2c] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#002046] shrink-0 border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </div>

            <div className="min-w-0 flex-1 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className="font-bold text-[#002046] text-xs">{item.name}</h4>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#e5eeff] text-[#002046] font-semibold">
                  {item.category}
                </span>
              </div>

              <p className="text-[#44474e] text-[11px] mt-1 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-2 pt-2 border-t border-[#e5eeff] flex items-center justify-between text-[11px] flex-wrap gap-2">
                <button
                  onClick={() => handleCopyContact(item.phone, item.name)}
                  className="font-semibold text-[#002046] hover:text-[#835500] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  {item.phone}
                </button>

                {item.pdfFile ? (
                  <button
                    onClick={onDownloadBusRoutes}
                    className="font-bold text-[#835500] hover:underline flex items-center gap-0.5"
                  >
                    Download Routes PDF &rarr;
                  </button>
                ) : (
                  <span className="text-[10px] text-[#74777f]">{item.campus}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 24x7 Emergency Contact Strip */}
      <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-xs text-[#ba1a1a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">local_hospital</span>
          <div>
            <p className="font-bold">Campus Security &amp; Medical Emergency</p>
            <p className="text-[10px] text-red-800">24x7 Control Room: +91 172-3984299</p>
          </div>
        </div>
        <button
          onClick={() => handleCopyContact('+911723984299', 'Emergency Hotline')}
          className="px-3 py-1 rounded-lg bg-[#ba1a1a] text-white text-xs font-bold shadow-xs active:scale-95"
        >
          Call SOS
        </button>
      </div>
    </section>
  );
};
