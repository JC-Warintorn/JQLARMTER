"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // เพิ่มการ Import Image ของ Next.js

export default function LoginScreen() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative p-4 font-sans text-slate-900">
      
      {/* --- JQ Logo Section (ใช้ไฟล์รูปภาพ) --- */}
      {/* เปลี่ยนชื่อ src ให้ตรงกับไฟล์รูปที่คุณใส่ในโฟลเดอร์ public */}
      <div className="absolute top-10 left-6 sm:left-10 shadow-lg rounded-2xl overflow-hidden flex items-center justify-center">
        <Image 
          src="/JQ.png" /* <--- เปลี่ยนชื่อไฟล์ตรงนี้ให้ตรงกับของคุณ */
          alt="JQ Logo" 
          width={64} 
          height={64}
          className="object-cover"
        />
      </div>

      {/* --- Login Card Section --- */}
      <div className="bg-[#FFE0B2] w-full max-w-sm rounded-[40px] px-8 py-10 flex flex-col items-center mt-20 shadow-xl border border-[#F4511E]">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-2">
          {isAdmin ? 'Login for Admin' : 'Login'}
        </h1>
        <p className="text-sm text-slate-700 font-medium mb-10">
          Nice to see you again!
        </p>

        {/* --- STUDENT/ADMIN Toggle Button --- */}
        {/* ปรับสีให้เหมือนกับปุ่ม TU GREATS: พื้นหลัง #FF5722, ตัวอักษรสีขาว */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-full py-2.5 text-sm font-bold transition-colors mb-6 shadow-sm"
        >
          {isAdmin ? 'STUDENT' : 'ADMIN'}
        </button>

        {/* --- TU GREATS Login Button --- */}
        {!isAdmin && (
          <button className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-full py-2.5 px-4 flex items-center justify-start gap-4 mb-4 transition-colors shadow-sm">
            <span className="bg-white text-[#FF5722] text-xs font-bold px-2 py-0.5 rounded-sm">
              TU
            </span>
            <span className="text-sm font-semibold flex-grow">
              Login with TU GREATS
            </span>
          </button>
        )}

        {/* --- Divider --- */}
        <div className="w-full flex items-center gap-3 mb-8">
          <div className="flex-1 h-[1px] bg-[#FF9800]"></div>
          <span className="text-[11px] font-bold text-slate-600 uppercase">OR</span>
          <div className="flex-1 h-[1px] bg-[#FF9800]"></div>
        </div>

        {/* --- Login Form --- */}
        <form className="w-full flex flex-col gap-6">
          
          {/* Username / Email Input */}
          <div>
            <label className="block text-xs font-bold mb-1.5 ml-4">
              {isAdmin ? 'Email' : 'Student-ID'}
            </label>
            <input
              type={isAdmin ? 'email' : 'text'}
              className="w-full bg-white text-slate-900 border border-[#F4511E] rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold mb-1.5 ml-4">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-white text-slate-900 border border-[#F4511E] rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          {/* --- Submit Button --- */}
          <button
            type="button"
            className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-full py-3 mt-4 flex items-center justify-between px-6 transition-colors font-bold text-base shadow-lg"
          >
            <span className="flex-grow text-center ml-4">Sign in</span>
            <span className="text-2xl leading-none">&rarr;</span>
          </button>
        </form>

        {/* --- Forgot Password Link --- */}
        <button className="mt-8 text-xs font-semibold text-slate-600 hover:text-[#F4511E] transition-colors">
          Forgot Password?
        </button>
      </div>
    </div>
  );
}