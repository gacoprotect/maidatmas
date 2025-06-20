import { FaUser, FaIdCard, FaPhone, FaHome, FaGraduationCap, FaBirthdayCake, FaEnvelope, FaUserTie } from 'react-icons/fa';

const DataSiswaContent = () => {
  // Data contoh siswa
  const student = {
    nis: '20230001',
    name: 'WAHYU WIJAYA',
    kelas: 'XII IPA 2',
    alamat: 'Jl. Merdeka No. 123, Jakarta',
    ttl: 'Jakarta, 15 Mei 2006',
    email: 'ahmad.fauzi@sekolah.sch.id',
    phone: '081234567890',
    orangTua: {
      ayah: 'Budi Santoso (081234567891)',
      ibu: 'Siti Aminah (081234567892)'
    },
    foto: '/assets/profile.png',
    ekstrakurikuler: ['Futsal', 'Robotika'],
    prestasi: ['Juara 1 Olimpiade Matematika Tingkat Kota 2022']
  };

  return (
    <div className="p-4 space-y-6">
      <div className="md:flex md:justify-between items-center space-y-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Data Siswa Lengkap</h3>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <FaUserTie className="text-lg" />
          Export Data
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Foto Profil */}
        <div className="flex-shrink-0">
          <div className="rounded-lg overflow-hidden w-48 h-64 border-2 border-gray-200 shadow-md">
            <img
              className="w-full h-full object-cover"
              src={student.foto}
              alt="Student profile"
            />
          </div>
        </div>

        {/* Data Siswa */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom 1 */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-600">
                <FaUser /> Identitas Diri
              </h4>
              <div className="space-y-3">
                <DataRow icon={<FaIdCard />} label="NIS" value={student.nis} />
                <DataRow icon={<FaUser />} label="Nama" value={student.name} />
                <DataRow icon={<FaGraduationCap />} label="Kelas" value={student.kelas} />
                <DataRow icon={<FaBirthdayCake />} label="TTL" value={student.ttl} />
                <DataRow icon={<FaEnvelope />} label="Email" value={student.email} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-600">
                <FaHome /> Alamat
              </h4>
              <p className="text-gray-700">{student.alamat}</p>
            </div>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-amber-600">
                <FaUserTie /> Orang Tua
              </h4>
              <div className="space-y-3">
                <DataRow icon={<FaUser />} label="Ayah" value={student.orangTua.ayah} />
                <DataRow icon={<FaUser />} label="Ibu" value={student.orangTua.ibu} />
                <DataRow icon={<FaPhone />} label="Kontak Darurat" value="081234567893" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-purple-600">
                <FaGraduationCap /> Aktivitas
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700">Ekstrakurikuler:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.ekstrakurikuler.map((item, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Prestasi:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {student.prestasi.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen kecil untuk menampilkan baris data
type DataRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const DataRow = ({ icon, label, value }: DataRowProps) => (
  <div className="flex items-start gap-3">
    <span className="text-gray-500 mt-1">{icon}</span>
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default DataSiswaContent;