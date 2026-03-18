"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar"; // ตรวจสอบ path ของ Navbar ให้ตรงกับโปรเจกต์คุณนะครับ

// ---- Types ----
type Status = "ว่าง" | "ถูกจอง" | "รออนุมัติ";

interface Equipment {
  id: string;
  name: string;
  assetId: string;
  status: Status;
  image: string;
  details: string[];
}

// ---- Mock Data ----
const equipmentList: Equipment[] = [
  { id: "1", name: "กล้อง Sony A7III", assetId: "671074", status: "ว่าง", image: "/images/camera1.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว", "การถ่ายต่อเนื่องโดยไม่มี Blackout ที่สูงสุด 30 fps พร้อมไฟก็อตโดมิติ/ปรับค่าแสงอัตโนมัติต่อเนื่องเต็มรูปแบบ"] },
  { id: "2", name: "กล้อง Sony A7III", assetId: "671075", status: "ถูกจอง", image: "/images/camera2.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "3", name: "กล้อง Sony A7III", assetId: "671076", status: "รออนุมัติ", image: "/images/camera3.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "4", name: "กล้อง Sony A7III", assetId: "671077", status: "รออนุมัติ", image: "/images/camera4.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "5", name: "กล้อง Sony A7III", assetId: "671078", status: "ว่าง", image: "/images/camera5.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "6", name: "กล้อง Sony A7III", assetId: "671079", status: "ถูกจอง", image: "/images/camera6.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "7", name: "กล้อง Sony A7III", assetId: "671080", status: "ว่าง", image: "/images/camera7.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
  { id: "8", name: "กล้อง Sony A7III", assetId: "671081", status: "ถูกจอง", image: "/images/camera8.jpg", details: ["เซนเซอร์ภาพ Exmor RS CMOS แบบเรียงซ้อนกันบางส่วนฟูลเฟรม 33.0 เมกะพิกเซล", "ระบบประมวลผลภาพ BIONZ XR2™ ที่มี AI ในตัว"] },
];

// ---- Status Badge ----
function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    ว่าง: "text-green-500",
    ถูกจอง: "text-red-500",
    รออนุมัติ: "text-yellow-500",
  };
  return <span className={`text-sm font-semibold ${colorMap[status]}`}>{status}</span>;
}

// ---- Image Placeholder ----
function ImagePlaceholder() {
  return (
    <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#d1d5db" />
        <line x1="0" y1="0" x2="200" y2="150" stroke="#9ca3af" strokeWidth="2" />
        <line x1="200" y1="0" x2="0" y2="150" stroke="#9ca3af" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ---- Equipment Card ----
function EquipmentCard({
  equipment,
  onCardClick,
  onSelectClick,
}: {
  equipment: Equipment;
  onCardClick: (eq: Equipment) => void;
  onSelectClick: (eq: Equipment) => void;
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onCardClick(equipment)}
    >
      <ImagePlaceholder />
      <div className="p-2">
        <p className="font-semibold text-gray-800 text-sm leading-tight">{equipment.name}</p>
        <p className="text-xs text-gray-500 mb-1">Asset ID: {equipment.assetId}</p>
        <div className="flex items-center justify-between">
          <StatusBadge status={equipment.status} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectClick(equipment);
            }}
            className="bg-gray-700 hover:bg-gray-900 text-white text-xs px-3 py-1 rounded-md transition-colors"
          >
            เลือก
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Detail Modal ----
function DetailModal({
  equipment,
  onClose,
  onSelect,
}: {
  equipment: Equipment;
  onClose: () => void;
  onSelect: (eq: Equipment) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-2xl w-[90%] max-w-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video bg-gray-600 flex items-center justify-center">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <rect width="300" height="200" fill="#4b5563" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#6b7280" strokeWidth="2" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#6b7280" strokeWidth="2" />
          </svg>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold">{equipment.name}</h2>
            <span className="text-xs text-gray-400">Asset ID: {equipment.assetId}</span>
          </div>
          <p className="text-sm font-semibold mb-2 text-gray-300">รายละเอียด:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {equipment.details.map((d, i) => (
              <li key={i} className="text-xs text-gray-300 leading-snug">{d}</li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <StatusBadge status={equipment.status} />
            <button
              onClick={() => onSelect(equipment)}
              className="bg-white text-gray-900 font-bold text-sm px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              เลือก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function AppointmentPage1() {
  const router = useRouter();

  // State สำหรับ Navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State สำหรับหน้านี้
  const [search, setSearch] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Status | "ทั้งหมด">("ทั้งหมด");

  const filtered = equipmentList.filter((eq) => {
    const matchSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.assetId.includes(search);
    const matchFilter = activeFilter === "ทั้งหมด" || eq.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const handleSelect = (eq: Equipment) => {
    // แก้ไข URL ตรงนี้ให้เปลี่ยนไปที่หน้า step2 แทน page2
    router.push(
      `/user/appointment/step2?assetId=${eq.assetId}&name=${encodeURIComponent(eq.name)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      
      {/* Mobile Container เพื่อจำกัดความกว้างให้ดูเหมือนแอปมือถือ */}
      <div className="w-full max-w-[390px] bg-white min-h-[90vh] shadow-2xl relative overflow-x-hidden">

        {/* ---- Navbar ---- */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className={`transition duration-300 ${isMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
          {/* ---- Search & Filter ---- */}
          <div className="px-4 py-3 bg-white shadow-sm sticky top-0 z-20">
            <div className="flex gap-2 items-center">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาอุปกรณ์ หรือ Asset ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen((v) => !v)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Filter
                </button>
                {filterOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setFilterOpen(false)} />
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl z-40 overflow-hidden border border-gray-100">
                      {(["ทั้งหมด", "ว่าง", "ถูกจอง", "รออนุมัติ"] as const).map((f) => (
                        <button
                          key={f}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            activeFilter === f
                              ? "bg-[#FFE0B2] text-[#F4511E] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => { setActiveFilter(f); setFilterOpen(false); }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ---- Equipment Grid ---- */}
          <div className="px-4 py-4 pb-10">
            {filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-16">ไม่พบอุปกรณ์ที่ค้นหา</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((eq) => (
                  <EquipmentCard
                    key={eq.id}
                    equipment={eq}
                    onCardClick={(e) => setSelectedEquipment(e)}
                    onSelectClick={handleSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ---- Detail Modal ---- */}
        {selectedEquipment && (
          <DetailModal
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
            onSelect={(eq) => { setSelectedEquipment(null); handleSelect(eq); }}
          />
        )}
      </div>
    </div>
  );
}