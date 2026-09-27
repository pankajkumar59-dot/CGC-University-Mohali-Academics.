import React, { useState } from 'react';
import { TIMETABLE_DATA } from '../data/mockData';

interface TimetableViewProps {
  onShowToast: (msg: string, icon?: string) => void;
}

export const TimetableView: React.FC<TimetableViewProps> = ({ onShowToast }) => {
  const [selectedDay, setSelectedDay] = useState<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'>('THU');
  const days: Array<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'> = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  const slots = TIMETABLE_DATA[selectedDay] || [];

  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#002046]">Class Schedule</h2>
          <p className="text-[11px] text-[#44474e]">B.Tech CSE Sem 4 (Sec B) • Block 3</p>
        </div>
        <button
          onClick={() => onShowToast('Timetable synced with Google / Phone Calendar!', 'event')}
          className="px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#002046] font-bold text-xs flex items-center gap-1 border border-[#cbdbf5] transition-colors"
        >
          <span className="material-symbols-outlined text-[15px]">sync</span>
          Sync Calendar
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const isToday = day === 'THU';

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                onShowToast(`Viewing ${day} Schedule`, 'calendar_today');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#002046] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
              }`}
            >
              {day} {isToday ? '(Today)' : ''}
            </button>
          );
        })}
      </div>

      {/* Slots List */}
      <div className="space-y-2.5">
        {slots.map((slot) => {
          const isCurrent = slot.status === 'current';
          const isCompleted = slot.status === 'completed';

          return (
            <div
              key={slot.id}
              className={`p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#feae2c]/15 border-2 border-[#feae2c] shadow-sm'
                  : isCompleted
                  ? 'bg-[#eff4ff]/60 border-[#e5eeff] opacity-75'
                  : 'bg-white border-[#e5eeff] shadow-sm hover:border-[#835500]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex flex-col items-center shrink-0 w-16">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-[#835500]' : 'text-[#002046]'
                      }`}
                    >
                      {slot.time}
                    </span>
                    <span className="text-[9px] text-[#74777f]">{slot.endTime}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {isCurrent && (
                        <span className="text-[8px] font-bold uppercase bg-[#feae2c] text-[#6b4500] px-1.5 py-0.5 rounded">
                          Current Class
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Attended
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-[#835500]">
                        {slot.block} • {slot.room}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-[#002046] mt-0.5 truncate">
                      {slot.subject}
                    </h4>
                    <p className="text-[10px] text-[#44474e] truncate">
                      {slot.instructor} {slot.topic ? `• ${slot.topic}` : ''}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onShowToast(`Reminder set for ${slot.time} - ${slot.subject}`, 'alarm')
                  }
                  className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-white text-[#835500] shadow-sm'
                      : 'text-[#74777f] hover:bg-[#eff4ff] hover:text-[#002046]'
                  }`}
                  title="Set Reminder"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isCurrent ? 'notifications_active' : 'notification_add'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Classroom Navigation Hint */}
      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#835500] text-[20px]">room</span>
          <div>
            <p className="font-bold text-[#002046]">Need campus directions?</p>
            <p className="text-[10px] text-[#44474e]">Block 3 has high-speed elevators &amp; water stations on every floor.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
