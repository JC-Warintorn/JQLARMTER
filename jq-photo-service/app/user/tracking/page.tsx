"use client";

import React, { useState } from "react";
// Import Component Navbar ที่เราเพิ่งสร้างมาใช้งาน
import Navbar from "../../components/Navbar"; 

export default function TrackingPage() {
  // State นี้ยังต้องอยู่หน้าหลัก เพื่อให้ <main> รู้ว่าต้องทำพื้นหลังจางไหม
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const timelineSteps = [
    { title: "ส่งคำขอ", date: "10 ต.ค. 69", time: "10:00-สมชาย", active: true },
    { title: "กำลังตรวจสอบ", date: "10 ต.ค. 69", time: "14:00-เจ้าหน้าที่ A", active: true },
    { title: "อนุมัติ", date: "11 ต.ค. 69", time: "09:00-หัวหน้า B", active: true },
    { title: "คืนแล้ว", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-white min-h-[90vh] shadow-2xl rounded-3xl overflow-hidden relative border border-gray-200">
        
        {/* Navbar Component */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className={`p-6 space-y-6 pb-24 transition duration-300 ${isMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
          
          {/* Section 1: Timeline */}
          <section>
            <h2 className="font-bold text-gray-950 mb-2.5">ลำดับขั้นตอน(Timeline)</h2>
            <div className="border border-gray-300 rounded-2xl p-4 flex justify-between items-start space-x-1">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1 text-center relative">
                  <div className={`text-xs border rounded px-2.5 py-1 whitespace-nowrap ${step.active ? 'border-gray-900 bg-white text-gray-950 font-medium' : 'border-gray-400 bg-white text-gray-600'}`}>
                    {step.title}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute top-1.5 -right-2 text-gray-600 text-xs hidden sm:block">➔</div>
                  )}
                  <div className="text-[11px] text-gray-800 mt-1 leading-tight">
                    <p>{step.date}</p>
                    <p>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: รายละเอียดคำขอ (ปรับ Layout กลับเป็นแบบเดิม: รูปอยู่ตรงกลาง) */}
          <section>
            <h2 className="font-bold text-gray-950 mb-2.5">สรุปรายละเอียดคำขอ</h2>
            <div className="border border-gray-300 rounded-2xl p-5 space-y-5 relative">
              
              {/* กล่องใส่รูป (จัดให้อยู่ตรงกลาง) */}
              <div className="flex justify-center">
                <div className="w-28 h-28 bg-gray-100 border border-gray-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 opacity-60">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <span className="relative text-xs font-semibold z-10 text-gray-950 text-center px-1">รูป / อุปกรณ์</span>
                </div>
              </div>
              
              {/* รายละเอียดข้อความ (เรียงลงมาด้านล่างรูป) */}
              <div className="text-sm space-y-2.5 text-gray-900">
                <div className="grid grid-cols-3 items-center">
                  <span className="font-semibold text-gray-950">ชื่ออุปกรณ์</span>
                  <span className="col-span-2 text-gray-950">กล้อง Sony A7III<br/>เลนส์ 50mm</span>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <span className="font-semibold text-gray-950">วันที่ยืม-คืน</span>
                  <span className="col-span-2 text-gray-950">12 ต.ค. 69 - 14 ต.ค. 69</span>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <span className="font-semibold text-gray-950">สถานะปัจจุบัน</span>
                  <span className="col-span-2 text-[#DE4E26] font-medium">อนุมัติ</span>
                </div>
              </div>

              {/* หมายเหตุ */}
              <div>
                <label className="font-semibold text-sm text-gray-950 block mb-1.5">หมายเหตุจากเจ้าหน้าที่</label>
                <textarea 
                  disabled
                  placeholder="ยังไม่มีหมายเหตุจากเจ้าหน้าที่"
                  className="w-full border border-gray-400 rounded-xl p-3 h-20 bg-gray-50 resize-none text-sm text-gray-950 placeholder-gray-500"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: ระบบแจ้งเตือน */}
          <section>
            <h2 className="font-bold text-gray-950 mb-2.5">ระบบแจ้งเตือนใกล้ครบกำหนดคืน</h2>
            <div className="bg-[#FCDCB5] rounded-xl flex overflow-hidden shadow-md h-auto items-center p-3.5 border border-[#DE4E26]">
              <div className="w-2.5 bg-[#DE4E26] self-stretch rounded-l-lg mr-3.5"></div>
              
              <div className="flex flex-col flex-grow justify-center space-y-2.5 text-[13px] font-medium text-gray-950">
                <div className="flex items-center space-x-2.5">
                   <div className="w-4 h-4 rounded-full bg-[#DE4E26] border border-[#DE4E26]"></div>
                   <span>เหลือเวลา 1 วันก่อนครบกำหนดคืน</span>
                </div>
                <div className="flex items-center space-x-2.5">
                   <div className="w-4 h-4 rounded-full bg-[#ED913A] border border-[#ED913A]"></div>
                   <span>เกินกำหนด 2 วัน ค่าปรับสะสม 400 (ยอดสะสม)</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Action Buttons */}
        <div className="absolute bottom-5 left-0 w-full px-5 flex justify-between space-x-2.5 text-[12px] font-semibold">
          <button className="flex-1 bg-[#ED913A] text-white py-2.5 rounded-lg shadow-md hover:bg-[#DE4E26] transition hover:shadow-lg flex flex-col items-center justify-center leading-tight p-1">
            <span>ดูรายละเอียด</span>
            <span>การรับจอง</span>
          </button>
          <button className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-lg border border-gray-300 cursor-not-allowed">
            ยกเลิกคำขอ
          </button>
          <button className="flex-1 bg-[#ED913A] text-white py-2.5 rounded-lg shadow-md hover:bg-[#DE4E26] transition hover:shadow-lg">
            แจ้งรับอุปกรณ์
          </button>
        </div>

      </div>
    </div>
  );
}