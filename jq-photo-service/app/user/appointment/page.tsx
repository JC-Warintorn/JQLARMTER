"use client";

import React, { useState } from 'react';
// 1. Import Component Navbar เข้ามา (เช็ค path ให้ตรงกับโฟลเดอร์ของคุณนะครับ)
import Navbar from '../../components/Navbar'; 

// รายชื่อเดือนสำหรับแสดงผล
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AppointmentForm() {
  // 2. เพิ่ม State สำหรับจัดการเปิด/ปิดเมนู Navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State สำหรับจัดการเดือน/ปี ที่กำลังเปิดดูบนปฏิทิน
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  
  // State เก็บวันที่ผู้ใช้เลือก 
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');

  // จำลองข้อมูลวันที่ถูกจองแล้ว 
  const [bookedDates] = useState<string[]>([
    '2026-03-10', '2026-03-20', '2026-03-21', '2026-03-23'
  ]);

  // --- ฟังก์ชันคำนวณปฏิทิน ---
  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // --- ฟังก์ชันจัดการคลิกและสี ---
  const handleDateClick = (day: number) => {
    const dateStr = formatDateString(currentYear, currentMonth, day);
    if (bookedDates.includes(dateStr)) return; 
    setSelectedDateStr(dateStr); 
  };

  const getDayStatusColor = (day: number) => {
    const dateStr = formatDateString(currentYear, currentMonth, day);

    if (bookedDates.includes(dateStr)) {
      return 'bg-[#F4511E] text-white cursor-not-allowed opacity-80'; 
    }
    if (selectedDateStr === dateStr) {
      return 'bg-[#FF9800] text-white ring-2 ring-offset-1 ring-[#FF9800] shadow-md'; 
    }
    return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors shadow-sm'; 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-10 font-sans text-slate-800">
      
      {/* Mobile Container */}
      <div className="w-full max-w-[390px] bg-white shadow-2xl relative">
        
        {/* 3. ลบ Header เดิมทิ้ง และเรียกใช้ Navbar Component พร้อมส่ง Props */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* 4. ครอบเนื้อหาทั้งหมดด้วย <main> และใส่เงื่อนไขความจาง (opacity) ตอนเปิดเมนู */}
        <main className={`transition duration-300 ${isMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
          
          {/* --- Calendar Section --- */}
          <div className="p-4">
            <div className="border-2 border-[#F4511E] rounded-2xl p-4 bg-white shadow-sm relative">
              
              <div className="flex items-center justify-between px-2 mb-4">
                <button onClick={handlePrevMonth} className="text-slate-400 hover:text-[#FF5722] p-2 transition-colors font-bold text-lg">&lt;</button>
                <span className="font-bold text-lg">{MONTH_NAMES[currentMonth]} {currentYear}</span>
                <button onClick={handleNextMonth} className="text-slate-400 hover:text-[#FF5722] p-2 transition-colors font-bold text-lg">&gt;</button>
              </div>

              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-2">
                <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div>
                <div>THU</div><div>FRI</div><div>SAT</div>
              </div>

              <div className="grid grid-cols-7 gap-y-3 justify-items-center text-sm font-medium relative">
                {Array.from({ length: startDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-7 h-7"></div>
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                  <div key={day} className="relative z-10 w-7 h-7 flex items-center justify-center">
                    <div 
                      onClick={() => handleDateClick(day)}
                      className={`w-7 h-7 flex items-center justify-center rounded-full ${getDayStatusColor(day)}`}
                    >
                      {day}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* --- Form Section --- */}
          <div className="px-4 pb-6">
            <div className="border-2 border-[#F4511E] rounded-2xl p-5 bg-white shadow-sm">
              <h2 className="text-lg font-extrabold mb-4 text-[#FF5722]">กรอกข้อมูล</h2>

              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">ชื่อ-นามสกุล</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">รหัสนักศึกษา</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">
                    เบอร์โทรศัพท์ <span className="text-red-500 text-xs font-normal">(required)</span>
                  </label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">รายวิชา / ชื่อโปรเจกต์</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]" />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-1">วันที่ยืม</label>
                    <input 
                      type="date" 
                      value={selectedDateStr} 
                      readOnly 
                      className="w-full text-sm bg-slate-100 text-slate-600 border border-[#F4511E] rounded-lg py-2 px-2 outline-none cursor-not-allowed" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-1">วันที่คืน</label>
                    <input type="date" className="w-full text-sm bg-slate-50 border border-[#F4511E] rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">เหตุผลการใช้งาน</label>
                  <textarea rows={2} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800] resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">แนบไฟล์เอกสาร</label>
                  <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FFE0B2] file:text-[#F4511E] hover:file:bg-[#FFCC80] bg-slate-50 border border-slate-300 rounded-lg cursor-pointer" />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                  <button type="button" className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold text-sm py-3 rounded-xl transition-colors">
                    บันทึกแบบร่าง
                  </button>
                  <button type="button" className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold text-sm py-3 rounded-xl transition-colors">
                    ยกเลิก
                  </button>
                  <button type="submit" className="flex-1 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-colors">
                    ส่งคำขอ
                  </button>
                </div>

              </form>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}