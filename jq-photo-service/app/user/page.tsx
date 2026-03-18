export default function UserPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
      <div className="bg-[#FFE0B2] p-10 rounded-3xl shadow-lg border-2 border-[#F4511E] text-center">
        <h1 className="text-3xl font-extrabold text-[#FF5722] mb-2">Student Dashboard</h1>
        <p className="font-medium text-slate-600 mb-8">ยินดีต้อนรับเข้าสู่หน้านักศึกษา</p>
        
        {/* เหลือแค่ปุ่มกลับหน้า Login อย่างเดียว */}
        <a href="/" className="inline-block bg-slate-300 text-slate-800 px-6 py-2 rounded-full font-bold hover:bg-slate-400 transition-colors">
          &larr; กลับหน้า Login
        </a>
      </div>
    </div>
  );
}