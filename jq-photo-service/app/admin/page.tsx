"use client";
import React, { useState } from 'react';
import { 
  Menu, 
  LogOut, 
  Settings, 
  BarChart3, 
  X
} from 'lucide-react';

// --- [โมเดลข้อมูล] ---
interface RequestItem {
  id: string;
  studentName: string;
  equipment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ข้อมูลจำลองสำหรับกราฟ 7 วันที่ผ่านมา
const weeklyStats = [
  { day: 'จ.', count: 18 },
  { day: 'อ.', count: 32 },
  { day: 'พ.', count: 25 },
  { day: 'พฤ.', count: 40 },
  { day: 'ศ.', count: 48 },
  { day: 'ส.', count: 15 },
  { day: 'อา.', count: 10 },
];

export default function App() {
  // เนื่องจากในสภาพแวดล้อมจำลองนี้อาจไม่รองรับ next/navigation 
  // เราจะใช้ window.location.href สำหรับการนำทางแทน
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  
  // ข้อมูลจำลองรายการคำขอ
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: '1', studentName: 'สมชาย ใจดี', equipment: 'กล้อง Sony A7R', date: '12 ต.ค. 69', status: 'pending' },
    { id: '2', studentName: 'สมหญิง รักดี', equipment: 'เลนส์ 50mm f1.8', date: '12 ต.ค. 69', status: 'pending' },
    { id: '3', studentName: 'วิชัย นามสมมติ', equipment: 'ขาตั้งกล้อง Manfrotto', date: '12 ต.ค. 69', status: 'pending' },
    { id: '4', studentName: 'มณี รัตนา', equipment: 'ไฟต่อเนื่อง LED', date: '12 ต.ค. 69', status: 'pending' },
    { id: '5', studentName: 'กิตติพงศ์ เรียนจบ', equipment: 'Gimbal DJI', date: '13 ต.ค. 69', status: 'pending' },
    { id: '6', studentName: 'นารี มีบุญ', equipment: 'กล้อง Canon R6', date: '13 ต.ค. 69', status: 'pending' },
    { id: '7', studentName: 'ปัญญา ไวมาก', equipment: 'Microphone Rode', date: '14 ต.ค. 69', status: 'pending' },
    { id: '8', studentName: 'ธนาธร ยิ้มสู้', equipment: 'Softbox 60x60', date: '14 ต.ค. 69', status: 'pending' },
    { id: '9', studentName: 'สุดาพร พรแสวง', equipment: 'แบตเตอรี่สำรอง FW50', date: '15 ต.ค. 69', status: 'pending' },
    { id: '10', studentName: 'เกรียงไกร ชนะศึก', equipment: 'กล้อง Nikon Z6', date: '15 ต.ค. 69', status: 'pending' },
  ]);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.filter(item => item.id !== id));
  };

  const handleConfirmReject = (id: string) => {
    setRequests(prev => prev.filter(item => item.id !== id));
    setRejectingId(null);
    setRejectReason('');
  };

  const handleLogout = () => {
    // ใช้ window.location สำหรับการกลับไปยังหน้าแรกเพื่อให้ปลอดภัยต่อสภาพแวดล้อมที่ไม่มี next/navigation
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const maxCount = Math.max(...weeklyStats.map(s => s.count)) + 5;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-10 overflow-x-hidden">
      
      {/* Header - สีส้มสว่าง */}
      <header className="bg-orange-500 h-16 px-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm">
            <img 
              src="/JQ.png" 
              alt="JQ Logo" 
              className="h-10 w-10 object-contain" 
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/40?text=JQ"; }} 
            />
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 text-white hover:bg-orange-600 rounded-full transition-colors"
          >
            <Menu size={28} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-orange-500 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
              <button className="w-full px-4 py-4 text-left hover:bg-orange-50 flex items-center justify-between font-bold border-b border-orange-100 text-sm text-slate-700">
                จัดการคำขอ <Settings size={18} className="text-orange-500" />
              </button>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-4 text-left hover:bg-red-50 text-red-600 flex items-center justify-between font-bold text-sm transition-colors"
              >
                ออกจากระบบ <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 mt-6 space-y-8">
        
        {/* ส่วนสรุปตัวเลข (Stats) */}
        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
            แสดงภาพรวม
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
             <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm min-w-[120px] flex-1 hover:border-orange-200 transition-colors group">
                <span className="text-[10px] font-black text-slate-400 block uppercase mb-1 group-hover:text-orange-500 leading-tight">คำขอทั้งหมด</span>
                <span className="text-2xl font-black text-slate-800">150</span>
             </div>
             <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm min-w-[120px] flex-1 hover:border-orange-200 transition-colors group">
                <span className="text-[10px] font-black text-slate-400 block uppercase mb-1 group-hover:text-orange-500 leading-tight">รออนุมัติ</span>
                <span className="text-2xl font-black text-orange-600">12</span>
             </div>
             <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm min-w-[120px] flex-1 hover:border-orange-200 transition-colors group">
                <span className="text-[10px] font-black text-slate-400 block uppercase mb-1 group-hover:text-orange-500 leading-tight">เกินกำหนด</span>
                <span className="text-2xl font-black text-red-500">3</span>
             </div>
          </div>
        </section>

        {/* กราฟจำนวนผู้ขอยืม */}
        <section className="space-y-0">
          <div className="bg-orange-500 border-x-2 border-t-2 border-orange-500 rounded-t-2xl px-4 py-2 font-black text-[10px] uppercase text-white shadow-sm flex justify-between items-center">
            <span>จำนวนผู้ขอยืม (คน) - 7 วันที่ผ่านมา</span>
            <BarChart3 size={14} />
          </div>
          <div className="bg-white border-x-2 border-b-2 border-slate-200 rounded-b-2xl p-6 relative shadow-sm">
            <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-40 pointer-events-none">
                {[...Array(5)].map((_, i) => <div key={i} className="border-t border-slate-100 w-full h-0"></div>)}
            </div>

            <div className="flex items-end justify-between h-40 relative z-10 gap-3">
              {weeklyStats.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group/bar cursor-default">
                  <span className="text-[11px] font-black text-orange-600 mb-1 group-hover/bar:scale-110 transition-transform">
                    {item.count}
                  </span>
                  
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="w-full max-w-[32px] bg-orange-500 rounded-t-lg transition-all duration-700 ease-out shadow-[0_4px_10px_rgba(249,115,22,0.3)] group-hover/bar:bg-orange-600 group-hover/bar:shadow-[0_4px_15px_rgba(249,115,22,0.5)]"
                      style={{ height: `${(item.count / maxCount) * 140}px` }}
                    >
                        <div className="w-1/2 h-full bg-white/20 rounded-tl-lg"></div>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-tighter group-hover/bar:text-orange-600 transition-colors">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ตารางรายการ */}
        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
            ตารางอนุมัติคำขอ
          </h2>
          
          <div className="bg-orange-500 border-2 border-orange-500 rounded-t-2xl px-4 py-3 flex text-[11px] font-black uppercase text-white shadow-md sticky top-0 z-10">
            <span className="flex-1">ชื่อนักศึกษา</span>
            <span className="flex-1">อุปกรณ์</span>
            <span className="flex-1">วันที่</span>
            <span className="w-24 text-right pr-2">จัดการ</span> 
          </div>
          
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar bg-white rounded-b-2xl border-x-2 border-b-2 border-slate-100">
            {requests.length > 0 ? (
              requests.map(item => (
                <div key={item.id} className="relative">
                  <div className={`flex items-center justify-between p-4 bg-white border-b border-slate-50 transition-all hover:bg-orange-50/30 ${rejectingId === item.id ? 'opacity-30 blur-[1px]' : ''}`}>
                    <div className="grid grid-cols-3 flex-1 gap-1 text-[11px] font-bold items-center text-slate-700">
                      <span className="truncate">{item.studentName}</span>
                      <span className="truncate text-orange-600">{item.equipment}</span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black border border-slate-200 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                      >
                        อนุมัติ
                      </button>
                      <button 
                        onClick={() => {
                          setRejectingId(item.id);
                          setRejectReason('');
                        }} 
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-black border border-red-100 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                      >
                        ปฏิเสธ
                      </button>
                    </div>
                  </div>

                  {rejectingId === item.id && (
                    <div className="absolute right-0 top-full mt-2 z-20 w-[260px] bg-orange-50 border-2 border-orange-500 rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 origin-top-right">
                      <div className="absolute -top-2.5 right-8 w-5 h-5 bg-orange-50 border-l-2 border-t-2 border-orange-500 rotate-45"></div>
                      <h3 className="font-black text-xs mb-3 text-orange-600 italic flex items-center gap-2">
                        <X size={14} className="text-red-500" /> ระบุเหตุผลการปฏิเสธ
                      </h3>
                      <textarea 
                        value={rejectReason} 
                        onChange={(e) => setRejectReason(e.target.value)} 
                        className="w-full h-24 border-2 border-orange-200 rounded-2xl p-3 text-xs focus:outline-none focus:border-orange-500 bg-white font-bold text-slate-700 shadow-inner" 
                        placeholder="ระบุเหตุผลที่นี่..."
                        autoFocus 
                      />
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => handleConfirmReject(item.id)} 
                          disabled={!rejectReason.trim()}
                          className="flex-1 bg-orange-500 text-white font-black py-2.5 rounded-xl text-[11px] shadow-[0px_3px_0px_0px_rgba(194,65,12,1)] active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
                        >
                          ยืนยัน
                        </button>
                        <button 
                          onClick={() => setRejectingId(null)} 
                          className="px-4 bg-orange-100 border-2 border-orange-200 text-orange-600 font-black py-2.5 rounded-xl text-[11px] hover:bg-orange-200 transition-colors active:scale-95"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-b-2xl">
                <p className="text-slate-400 font-black italic text-sm">ไม่พบรายการคำขอในขณะนี้</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ea580c; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}