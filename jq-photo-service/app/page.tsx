"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // 1. เพิ่ม State เพื่อเก็บค่าจากช่อง Input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. เพิ่ม State สำหรับเก็บข้อความ Error
  const [errorMessage, setErrorMessage] = useState('');

  // ฟังก์ชันสำหรับสลับหน้าจอ (เคลียร์ข้อมูลเดิมทิ้งด้วยเมื่อสลับหน้า)
  const handleToggleMode = () => {
    setIsAdmin(!isAdmin);
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  const handleSignIn = () => {
    // 3. Validation: เช็คว่าช่องใดช่องหนึ่งว่างหรือไม่
    if (!username.trim() || !password.trim()) {
      setErrorMessage('กรุณากรอกข้อมูลให้ครบถ้วน'); // แจ้งเตือนถ้าข้อมูลไม่ครบ
      return; // หยุดการทำงาน ไม่เปลี่ยนหน้า
    }

    // เคลียร์ Error (ถ้ามี) เมื่อผ่านการเช็ค
    setErrorMessage('');

    // ทำการเปลี่ยนหน้า
    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push('/user');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative p-4 font-sans text-slate-900">
      
      {/* --- JQ Logo Section --- */}
      <div className="absolute top-10 left-6 sm:left-10 shadow-lg rounded-2xl overflow-hidden flex items-center justify-center">
        <Image 
          src="/JQ.png" 
          alt="JQ Logo" 
          width={64} 
          height={64}
          className="object-cover"
        />
      </div>

      {/* --- Login Card Section --- */}
      <div className="bg-[#FFE0B2] w-full max-w-sm rounded-[40px] px-8 py-10 flex flex-col items-center mt-20 shadow-xl border border-[#F4511E]">
        
        <h1 className="text-3xl font-extrabold mb-2">
          {isAdmin ? 'Login for Admin' : 'Login'}
        </h1>
        <p className="text-sm text-slate-700 font-medium mb-10">
          Nice to see you again!
        </p>

        {/* --- STUDENT/ADMIN Toggle Button --- */}
        <button
          onClick={handleToggleMode}
          className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-full py-2.5 text-sm font-bold transition-colors mb-8 shadow-sm"
        >
          {isAdmin ? 'STUDENT' : 'ADMIN'}
        </button>

        {/* --- Login Form --- */}
        <form className="w-full flex flex-col gap-6">
          
          <div>
            <label className="block text-xs font-bold mb-1.5 ml-4">
              {isAdmin ? 'Email' : 'Student-ID'}
            </label>
            <input
              type={isAdmin ? 'email' : 'text'}
              value={username} // ผูกค่ากับ State
              onChange={(e) => setUsername(e.target.value)} // อัปเดต State เมื่อพิมพ์
              className="w-full bg-white text-slate-900 border border-[#F4511E] rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 ml-4">
              Password
            </label>
            <input
              type="password"
              value={password} // ผูกค่ากับ State
              onChange={(e) => setPassword(e.target.value)} // อัปเดต State เมื่อพิมพ์
              className="w-full bg-white text-slate-900 border border-[#F4511E] rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          {/* 4. แสดงข้อความ Error (ถ้ามี) */}
          {errorMessage && (
            <div className="text-red-500 text-xs font-bold text-center -mb-2">
              {errorMessage}
            </div>
          )}

          {/* --- Submit Button --- */}
          <button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-full py-3 mt-4 flex items-center justify-between px-6 transition-colors font-bold text-base shadow-lg"
          >
            <span className="flex-grow text-center ml-4">Sign in</span>
            <span className="text-2xl leading-none">&rarr;</span>
          </button>
        </form>

        <button className="mt-8 text-xs font-semibold text-slate-600 hover:text-[#F4511E] transition-colors">
          Forgot Password?
        </button>
      </div>
    </div>
  );
}