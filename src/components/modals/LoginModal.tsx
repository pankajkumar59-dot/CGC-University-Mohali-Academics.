import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { DEMO_STUDENTS } from '../../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
  currentStudent: StudentProfile;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentStudent,
}) => {
  const [rollNo, setRollNo] = useState(currentStudent.rollNo);
  const [password, setPassword] = useState('cgc@2024');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRoll = rollNo.trim();
    const found = DEMO_STUDENTS.find(
      (s) => s.rollNo === cleanRoll || s.urn === cleanRoll || s.email.toLowerCase() === cleanRoll.toLowerCase()
    );

    if (found) {
      setError('');
      onLoginSuccess(found);
      onClose();
    } else {
      setError('Invalid Roll No or URN. Try using demo student credentials below.');
    }
  };

  const handleSelectDemo = (student: StudentProfile) => {
    setRollNo(student.rollNo);
    setPassword('cgc@2024');
    setError('');
    onLoginSuccess(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#eff4ff]">
        {/* Banner with CGC Branding */}
        <div className="p-5 bg-gradient-to-r from-[#002046] via-[#1b365d] to-[#002046] text-white flex flex-col items-center text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1X4optcITPddOZqk-Lg82pxc7PUiwdylTKlr1pOEn7zrfRUAr-HkTB8VRNIxgQDjCYtSi0lTp8m5mIgIOWvNiEDYP-CpDOeuplWYqpHYqpesuitSTrEoZb18J2DdV0dbpOnRbAMMMFS0YjaXz0IE1udzHVcXs7Hb5iFX02AdMfytl2Hy2ZcwhuzYgIuTyNGwyO6NQVHh-QS44aXeZ_pg45AVZ0PlJJOxjjDWnOhW777Q_9yEVCmOdIwOk"
            alt="CGC Logo"
            className="h-10 w-auto object-contain bg-white/10 p-1 rounded-lg mb-2"
          />
          <span className="text-[10px] font-bold text-[#feae2c] uppercase tracking-widest">
            CHANDIGARH GROUP OF COLLEGES
          </span>
          <h2 className="text-lg font-extrabold text-white mt-0.5">Student ERP Portal Login</h2>
          <p className="text-[11px] text-[#87a0cd]">Landran &amp; Jhanjeri Campuses • PTU Affiliated</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-600">error</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#002046] mb-1">
              Roll No / PTU URN
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#74777f] text-[18px]">
                badge
              </span>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. 261000020368"
                required
                className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#002046] font-medium focus:outline-none focus:ring-2 focus:ring-[#002046]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#002046] mb-1">
              Portal Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#74777f] text-[18px]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-[#f8f9ff] border border-[#cbdbf5] rounded-xl pl-9 pr-10 py-2 text-xs text-[#002046] font-medium focus:outline-none focus:ring-2 focus:ring-[#002046]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#74777f] hover:text-[#002046]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#44474e]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#cbdbf5] text-[#002046] focus:ring-[#002046]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Demo Password is: cgc@2024\nOr choose one of the demo profiles below.')}
              className="text-[#835500] font-bold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">login</span>
            Sign In to Student Portal
          </button>

          {/* Quick Demo Credentials Switcher */}
          <div className="pt-3 border-t border-[#cbdbf5]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#74777f] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#feae2c]">fingerprint</span>
              Instant Demo Access (Click to Test):
            </p>
            <div className="space-y-1.5">
              {DEMO_STUDENTS.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleSelectDemo(student)}
                  className={`w-full p-2 rounded-xl text-left border flex items-center justify-between text-xs transition-colors ${
                    student.rollNo === currentStudent.rollNo
                      ? 'bg-[#eff4ff] border-[#002046] ring-1 ring-[#002046]'
                      : 'bg-[#f8f9ff] border-[#cbdbf5] hover:border-[#feae2c]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#002046]/20"
                    />
                    <div>
                      <div className="font-bold text-[#002046]">{student.name}</div>
                      <div className="text-[10px] text-[#44474e]">
                        Roll: {student.rollNo} • Sem {student.semester} ({student.branch})
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-[#835500] font-bold text-[10px] border border-[#feae2c]/50">
                    Switch
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[9px] text-[#74777f] text-center mt-2">
              Default password for all demo accounts: <code className="bg-[#eff4ff] px-1 py-0.5 rounded text-[#002046] font-bold">cgc@2024</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
