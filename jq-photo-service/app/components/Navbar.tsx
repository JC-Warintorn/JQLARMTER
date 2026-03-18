"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link เข้ามาใช้งาน

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm relative z-20">
        <div className="flex items-center space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-md border border-gray-100 shadow-sm">
            <Image 
              src="/JQ.png" 
              alt="JQ Logo" 
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 text-gray-800 hover:text-black focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* เมนูดร็อปดาวน์ มุมขวาบน */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-40 text-sm flex flex-col overflow-hidden">
          
          {/* 2. เปลี่ยน button เป็น Link และใส่ href นำทาง */}
          <Link 
            href="/user/appointment" // <-- แก้ไข URL ตรงนี้ให้ตรงกับโฟลเดอร์ appointment ของคุณ
            onClick={handleMenuClick} 
            className="px-4 py-3 text-left text-gray-900 hover:bg-[#FEF3E8] border-b border-gray-100 transition duration-150 block w-full"
          >
            จองอุปกรณ์
          </Link>
          
          <Link 
            href="/user/tracking" // ลิ้งก์มาหน้าคำขอของฉัน
            onClick={handleMenuClick} 
            className="px-4 py-3 text-left text-gray-900 hover:bg-[#FEF3E8] border-b border-gray-100 transition duration-150 block w-full"
          >
            คำขอของฉัน
          </Link>
          
          <Link 
            href="/" // <-- ลิ้งก์กลับไปหน้าแรกสุด (app/page.tsx)
            onClick={handleMenuClick} 
            className="px-4 py-3 text-left text-[#DE4E26] hover:bg-[#FEF3E8] font-semibold transition duration-150 block w-full"
          >
            ออกจากระบบ
          </Link>

        </div>
      )}
    </>
  );
}