"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// รายชื่อเดือนสำหรับแสดงผล
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AppointmentForm() {
  // 1. State สำหรับจัดการเดือน/ปี ที่กำลังเปิดดูบนปฏิทิน (เริ่มที่เดือนปัจจุบัน)
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  
  // 2. State เก็บวันที่ผู้ใช้เลือก (เก็บเป็น String เช่น "2026-03-18")
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');

  // 3. จำลองข้อมูลวันที่ถูกจองแล้ว (เก็บเป็นรูปแบบ YYYY-MM-DD)
  const [bookedDates] = useState<string[]>([
    '2026-03-10', '2026-03-20', '2026-03-21', '2026-03-23'
  ]);

  // --- ฟังก์ชันคำนวณปฏิทิน ---
  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth(); // 0 - 11

  // หาว่าเดือนนี้มีกี่วัน
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // หาว่าวันที่ 1 ของเดือนนี้ ตรงกับวันอะไร (0 = อาทิตย์, 1 = จันทร์, ...)
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // เลื่อนไปเดือนก่อนหน้า
  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // เลื่อนไปเดือนถัดไป
  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // ฟังก์ชันแปลง วัน,เดือน,ปี เป็น Format "YYYY-MM-DD"
  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // --- ฟังก์ชันจัดการคลิกและสี ---
  const handleDateClick = (day: number) => {
    const dateStr = formatDateString(currentYear, currentMonth, day);
    if (bookedDates.includes(dateStr)) return; // ถูกจองแล้ว กดไม่ได้
    setSelectedDateStr(dateStr); // บันทึกวันที่เลือกลง State
  };

  const getDayStatusColor = (day: number) => {
    const dateStr = formatDateString(currentYear, currentMonth, day);

    if (bookedDates.includes(dateStr)) {
      return 'bg-[#F4511E] text-white cursor-not-allowed opacity-80'; // จองแล้ว
    }
    if (selectedDateStr === dateStr) {
      return 'bg-[#FF9800] text-white ring-2 ring-offset-1 ring-[#FF9800] shadow-md'; // เลือกอยู่
    }
    return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors shadow-sm'; // ว่าง
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-10 font-sans text-slate-800">
      
      {/* Mobile Container */}
      <div className="w-full max-w-[390px] bg-white shadow-2xl relative">
        
        {/* --- Header / Navbar --- */}
        <div className="bg-[#FFE0B2] h-16 flex items-center justify-between px-4 border-b-2 border-[#FF9800]">
          <div className="w-10 h-10 shadow-sm rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <Image 
              src="/JQ.png" 
              alt="JQ Logo" 
              width={40} 
              height={40}
              className="object-cover"
            />
          </div>
          <button className="space-y-1.5 p-2">
            <div className="w-6 h-1 bg-[#F4511E] rounded-full"></div>
            <div className="w-6 h-1 bg-[#F4511E] rounded-full"></div>
            <div className="w-6 h-1 bg-[#F4511E] rounded-full"></div>
          </button>
        </div>

        {/* --- Calendar Section --- */}
        <div className="p-4">
          <div className="border-2 border-[#F4511E] rounded-2xl p-4 bg-white shadow-sm relative">
            
            {/* Calendar Header (เปลี่ยนเดือน/ปี) */}
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
              {/* สร้างกล่องเปล่าๆ สำหรับวันก่อนหน้าวันที่ 1 */}
              {Array.from({ length: startDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="w-7 h-7"></div>
              ))}

              {/* สร้างวันที่ 1 ถึงวันสุดท้ายของเดือน */}
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

              {/* วันที่ยืม - วันที่คืน */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1">วันที่ยืม</label>
                  <input 
                    type="date" 
                    value={selectedDateStr} // ผูกค่าจาก State ของเรา
                    readOnly // ให้ผู้ใช้อ่านได้อย่างเดียว บังคับให้ไปกดเลือกที่ปฏิทินแทน
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

              {/* Action Buttons */}
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
      </div>
    </div>
  );
}