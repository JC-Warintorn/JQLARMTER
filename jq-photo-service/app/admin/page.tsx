export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
      <div className="bg-[#FFE0B2] p-10 rounded-3xl shadow-lg border-2 border-[#F4511E] text-center">
        <h1 className="text-3xl font-extrabold text-[#FF5722] mb-2">Admin Dashboard</h1>
        <p className="font-medium text-slate-600">ยินดีต้อนรับเข้าสู่หน้าผู้ดูแลระบบ</p>
        
        {/* ปุ่มสำหรับกดย้อนกลับไปหน้า Login */}
        <a href="/" className="mt-6 inline-block bg-[#FF5722] text-white px-6 py-2 rounded-full font-bold hover:bg-[#F4511E] transition-colors">
          &larr; กลับหน้า Login
        </a>
      </div>
    </div>
  );
}