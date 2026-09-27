import React from 'react';
import { StudentProfile } from '../types';

interface ProfileViewProps {
  student: StudentProfile;
  onOpenLogin: () => void;
  onLogout: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  onOpenLogin,
  onLogout,
  onShowToast,
}) => {
  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Physical Smart ID Card Look */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#002046] via-[#1b365d] to-[#002046] text-white shadow-xl border border-white/10 flex flex-col gap-3">
        {/* Card Top */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <img
              alt="CGC"
              src="https://lh3.googleusercontent.com/aida/AEtjO1X4optcITPddOZqk-Lg82pxc7PUiwdylTKlr1pOEn7zrfRUAr-HkTB8VRNIxgQDjCYtSi0lTp8m5mIgIOWvNiEDYP-CpDOeuplWYqpHYqpesuitSTrEoZb18J2DdV0dbpOnRbAMMMFS0YjaXz0IE1udzHVcXs7Hb5iFX02AdMfytl2Hy2ZcwhuzYgIuTyNGwyO6NQVHh-QS44aXeZ_pg45AVZ0PlJJOxjjDWnOhW777Q_9yEVCmOdIwOk"
              className="h-6 w-auto object-contain bg-white/10 p-0.5 rounded"
            />
            <span className="text-[10px] font-extrabold tracking-wider text-white">
              CGC STUDENT IDENTITY CARD
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[8px] font-bold">
            VALID {student.validUpto}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex items-center gap-3.5">
          <img
            alt={student.name}
            src={student.avatarUrl}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#feae2c] shrink-0 shadow-md"
          />
          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-white truncate">{student.name}</h3>
            <p className="text-[11px] text-[#87a0cd]">
              URN: {student.urn} • {student.course} {student.branch}
            </p>
            <p className="text-[10px] text-white/80">Campus: {student.campus}</p>
            <span className="inline-block mt-1 text-[8px] font-bold bg-white/20 text-white px-2 py-0.5 rounded">
              Sem {student.semester} • {student.section}
            </span>
          </div>
        </div>

        {/* Barcode & PTU Reg */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#87a0cd]">
          <span className="tracking-widest">|||| ||| ||||| || |||||| |||| {student.rollNo}</span>
          <span className="font-bold text-[#feae2c]">PTU Reg: {student.ptuReg}</span>
        </div>
      </div>

      {/* Info Sheet */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2 text-xs">
        <h4 className="font-bold text-[#002046] text-[10px] uppercase tracking-wider text-[#74777f]">
          Academic Mentorship &amp; Campus Logistics
        </h4>

        <div className="flex justify-between py-1.5 border-b border-[#e5eeff]">
          <span className="text-[#44474e]">Official Student Email</span>
          <span className="font-bold text-[#002046] font-mono">{student.email}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-[#e5eeff]">
          <span className="text-[#44474e]">Faculty Mentor</span>
          <span className="font-bold text-[#002046]">{student.mentor}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-[#e5eeff]">
          <span className="text-[#44474e]">Hostel Residence</span>
          <span className="font-bold text-[#002046]">{student.hostel}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-[#e5eeff]">
          <span className="text-[#44474e]">Registered Transport Bus</span>
          <span className="font-bold text-[#002046]">{student.busRoute}</span>
        </div>

        <div className="flex justify-between py-1.5">
          <span className="text-[#44474e]">Academic Bank of Credits</span>
          <span className="font-bold text-[#835500] font-mono">{student.abcId}</span>
        </div>
      </div>

      {/* Portal Settings & Preferences */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2 text-xs">
        <h4 className="font-bold text-[#002046] text-[10px] uppercase tracking-wider text-[#74777f]">
          Portal Settings &amp; Security
        </h4>

        <div className="flex items-center justify-between py-1.5 border-b border-[#e5eeff]">
          <div>
            <p className="font-bold text-[#002046]">Push Notifications &amp; Circulars</p>
            <p className="text-[10px] text-[#74777f]">Instant alerts for MST-1 datesheet &amp; CRC placements</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Enabled
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-[#e5eeff]">
          <div>
            <p className="font-bold text-[#002046]">Offline Material Auto-Caching</p>
            <p className="text-[10px] text-[#74777f]">Cache notes when connected to campus Wi-Fi</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Active
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <div>
            <p className="font-bold text-[#002046]">Biometric / Quick PIN Access</p>
            <p className="text-[10px] text-[#74777f]">Faster sign in on verified personal devices</p>
          </div>
          <span className="text-[10px] font-bold text-[#002046] bg-[#eff4ff] px-2 py-0.5 rounded">
            Configured
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() =>
            onShowToast('Digital Student ID pass added to Google / Apple Wallet!', 'badge')
          }
          className="w-full py-2.5 rounded-xl bg-[#002046] text-white text-xs font-bold active:scale-95 hover:bg-[#1b365d] transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[17px]">account_balance_wallet</span>
          Add ID to Google / Apple Wallet
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenLogin}
            className="py-2.5 rounded-xl bg-[#eff4ff] text-[#002046] text-xs font-bold hover:bg-[#e5eeff] transition-all border border-[#cbdbf5] flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#835500]">switch_account</span>
            Switch Profile
          </button>

          <button
            onClick={onLogout}
            className="py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all border border-red-200 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};
