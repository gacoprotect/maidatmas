import { useState } from "react";
import {
  FaMoneyBillAlt,
  FaHistory,
  FaTimes,
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaFileInvoiceDollar,
  FaUserGraduate,
  FaFootballBall,
} from "react-icons/fa";
import DataSiswaContent from "./DataSiswaContent";
import TagihanContent from "./TagihanContent";
import ExtrakulikulerContent from "./ExtrakulikulerContent";


const student = {
  name: "WAHYU WIJAYA",
  nis: "123456",
  kelas: "7B",
};
const menuItems = [
  {
    title: "Tagihan",
    icon: <FaFileInvoiceDollar className="w-6 h-6 text-green-600" />,
    color: "border-green-700 bg-green-50 hover:bg-green-100",
    content: <TagihanContent />,
  },
  {
    title: "Data Siswa",
    icon: <FaUserGraduate className="w-6 h-6 text-amber-600" />,
    color: "border-amber-700 bg-amber-50 hover:bg-amber-100",
    content: <DataSiswaContent />,
  },
  {
    title: "Extrakulikuler", // Perhatikan penulisan "Ekstrakurikuler" yang benar
    icon: <FaFootballBall className="w-6 h-6 text-rose-600" />,
    color: "border-rose-700 bg-rose-50 hover:bg-rose-100",
    content: <ExtrakulikulerContent />,
  },
];
export default function MenuDashboard() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6 mb-6 p-4 bg-blue-100 rounded-lg shadow-sm items-center">
        <div className="flex-shrink-0">
          <div className="rounded-full overflow-hidden w-36 h-48 border-2 border-gray-200">
            <img
              className="w-full h-full object-cover"
              src="./assets/profile.png"
              alt="Student profile"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full flex flex-col items-center sm:items-start">
          <div className="w-full max-w-md">
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-500 text-xl flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-semibold truncate">
                {student.name}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <FaIdCard className="text-gray-500 text-lg flex-shrink-0" />
              <p className="text-base md:text-lg">NIS: {student.nis}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaGraduationCap className="text-gray-500 text-lg flex-shrink-0" />
              <p className="text-base md:text-lg">Kelas: {student.kelas}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 rounded-lg p-4 shadow-sm mb-3">
        <div className="pb-3 border-b border-primary/10">
          <span className="text-secondary font-medium text-sm">
            Saldo Tabungan
          </span>
          <h1 className="text-2xl font-bold text-primary mt-1">Rp2.000.000</h1>
        </div>

        <div className="flex justify-between mt-3 gap-2">
          <button
            className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
            onClick={() => null}
          >
            <FaMoneyBillAlt className="w-6 h-6  text-sky-600" />
            <span className="mt-2 text-sm font-medium  text-sky-600">
              Top Up
            </span>
          </button>

          <button
            className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-sky-500/5 hover:bg-sky-500/10 transition-colors duration-200"
            onClick={() => null}
          >
            <FaHistory className="w-6 h-6 text-sky-600" />
            <span className="mt-2 text-sm font-medium text-sky-600">
              Riwayat
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`rounded-xl p-2 border border-t-5 flex flex-col items-center justify-center transition duration-200 ${item.color}`}
            onClick={() => setActiveItem(index)}
          >
            {item.icon}
            <span className="mt-2 text-sm text-gray-800 font-semibold text-center">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {activeItem !== null && (
        <div className="relative bg-blue-50 rounded-xl shadow-lg p-6 border border-t-4 border-gray-800">
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            aria-label="Tutup"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          {menuItems[activeItem].content}
        </div>
      )}
    </div>
  );
}
