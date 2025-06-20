import {
  FaRunning,
  FaMusic,
  FaBook,
  FaFlask,
  FaChess,
  FaPaintBrush,
  FaUsers,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const ExtrakulikulerContent = () => {
  // Data contoh ekstrakurikuler
  const extracurriculars = [
    {
      id: 1,
      name: "Futsal",
      day: "Senin",
      time: "15.00-17.00",
      coach: "Coach Ahmad",
      quota: 20,
      registered: 18,
      icon: <FaRunning className="text-red-500" />,
    },
    {
      id: 2,
      name: "Pramuka",
      day: "Rabu",
      time: "14.00-16.00",
      coach: "Pak Budi",
      quota: 30,
      registered: 25,
      icon: <FaUsers className="text-amber-500" />,
    },
    {
      id: 3,
      name: "Seni Lukis",
      day: "Kamis",
      time: "13.00-15.00",
      coach: "Bu Citra",
      quota: 15,
      registered: 12,
      icon: <FaPaintBrush className="text-blue-500" />,
    },
    {
      id: 4,
      name: "Robotika",
      day: "Selasa",
      time: "15.00-17.00",
      coach: "Pak Dedi",
      quota: 12,
      registered: 10,
      icon: <FaFlask className="text-purple-500" />,
    },
    {
      id: 5,
      name: "Paduan Suara",
      day: "Jumat",
      time: "14.00-16.00",
      coach: "Bu Eka",
      quota: 25,
      registered: 20,
      icon: <FaMusic className="text-green-500" />,
    },
    {
      id: 6,
      name: "Catur",
      day: "Senin",
      time: "16.00-18.00",
      coach: "Pak Fajar",
      quota: 10,
      registered: 8,
      icon: <FaChess className="text-gray-500" />,
    },
  ];

  // Data siswa yang sudah terdaftar
  const studentActivities = [
    { id: 1, name: "Futsal", status: "Aktif" },
    { id: 4, name: "Robotika", status: "Aktif" },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Ekstrakurikuler</h3>
      </div>

      {/* Ekstrakurikuler yang diikuti siswa */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
          <FaRunning className="text-indigo-500" />
          Ekstrakurikuler Yang Diikuti
        </h4>

        {studentActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentActivities.map((activity) => (
              <div
                key={activity.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-lg">{activity.name}</h5>
                    <p className="text-gray-600">
                      Status:{" "}
                      <span className="font-medium text-green-600">
                        {activity.status}
                      </span>
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Keluar
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Rabu, 14.00-16.00</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    Lihat Jadwal
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Anda belum terdaftar dalam ekstrakurikuler apapun</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
              Daftar Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Daftar Ekstrakurikuler Tersedia */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
          <FaBook className="text-indigo-500" />
          Daftar Ekstrakurikuler Tersedia
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {extracurriculars.map((ext) => (
            <div
              key={ext.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-100 rounded-full">{ext.icon}</div>
                <h5 className="font-bold text-lg">{ext.name}</h5>
              </div>

              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-gray-400" />
                  {ext.day}, {ext.time}
                </p>
                <p className="text-gray-600">Pelatih: {ext.coach}</p>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-xs text-gray-500">
                      Kuota: {ext.registered}/{ext.quota}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{
                          width: `${(ext.registered / ext.quota) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {studentActivities.some((a) => a.id === ext.id) ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Sudah Terdaftar
                    </span>
                  ) : (
                    <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded">
                      Daftar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Informasi Penting */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex items-start gap-3">
          <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800">Informasi Penting</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-blue-700">
              <li>Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler</li>
              <li>Pendaftaran ditutup ketika kuota terpenuhi</li>
              <li>Kehadiran minimal 80% untuk mendapatkan sertifikat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtrakulikulerContent;
