import {
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const TagihanContent = () => {
  // Data contoh tagihan
  const invoices = [
    {
      id: "INV-2023-001",
      jenis: "SPP",
      bulan: "Januari 2023",
      jumlah: 750000,
      jatuhTempo: "2023-01-10",
      status: "lunas",
      tanggalBayar: "2023-01-05",
    },
    {
      id: "INV-2023-002",
      jenis: "SPP",
      bulan: "Februari 2023",
      jumlah: 750000,
      jatuhTempo: "2023-02-10",
      status: "lunas",
      tanggalBayar: "2023-02-03",
    },
    {
      id: "INV-2023-003",
      jenis: "SPP",
      bulan: "Maret 2023",
      jumlah: 750000,
      jatuhTempo: "2023-03-10",
      status: "belum lunas",
    },
    {
      id: "INV-2023-004",
      jenis: "Kegiatan",
      deskripsi: "Study Tour",
      jumlah: 1200000,
      jatuhTempo: "2023-03-15",
      status: "belum lunas",
    },
    {
      id: "INV-2023-005",
      jenis: "Uang Gedung",
      deskripsi: "Pembangunan Fasilitas",
      jumlah: 2500000,
      jatuhTempo: "2023-01-31",
      status: "lunas",
      tanggalBayar: "2023-01-28",
    },
  ];

  // Hitung total tagihan
  const totalTagihan = invoices.reduce(
    (sum, invoice) => sum + invoice.jumlah,
    0
  );
  const totalLunas = invoices
    .filter((invoice) => invoice.status === "lunas")
    .reduce((sum, invoice) => sum + invoice.jumlah, 0);
  const totalBelumLunas = totalTagihan - totalLunas;

  return (
    <div className="p-4 space-y-6">
      <div className="md:flex md:justify-between space-y-3 items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Daftar Tagihan</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <FaFileInvoiceDollar className="text-lg" />
          Buat Tagihan Baru
        </button>
      </div>

      {/* Statistik Tagihan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Tagihan"
          value={`Rp ${totalTagihan.toLocaleString("id-ID")}`}
          icon={<FaFileInvoiceDollar className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Lunas"
          value={`Rp ${totalLunas.toLocaleString("id-ID")}`}
          icon={<FaCheckCircle className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Belum Lunas"
          value={`Rp ${totalBelumLunas.toLocaleString("id-ID")}`}
          icon={<FaExclamationTriangle className="text-amber-500" />}
          bgColor="bg-amber-50"
        />
      </div>

      {/* Daftar Tagihan */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Tagihan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jatuh Tempo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.jenis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.deskripsi || invoice.bulan || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp {invoice.jumlah.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      {new Date(invoice.jatuhTempo).toLocaleDateString("id-ID")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={invoice.status as StatusType} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {invoice.status === "belum lunas" ? (
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Bayar
                      </button>
                    ) : (
                      <span className="text-gray-400">Sudah dibayar</span>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Tagihan yang belum dibayar setelah jatuh tempo akan dikenakan
              denda sebesar 2% per bulan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen kecil untuk badge status
type StatusType = "lunas" | "belum lunas";

const StatusBadge = ({ status }: { status: StatusType }) => {
  const statusConfig = {
    lunas: {
      color: "bg-green-100 text-green-800",
      icon: <FaCheckCircle className="mr-1" />,
    },
    "belum lunas": {
      color: "bg-amber-100 text-amber-800",
      icon: <FaClock className="mr-1" />,
    },
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[status].color}`}
    >
      {statusConfig[status].icon}
      {status === "lunas" ? "Lunas" : "Belum Lunas"}
    </span>
  );
};

// Komponen kecil untuk statistik card
type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
};

const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => (
  <div className={`${bgColor} p-4 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-white">{icon}</div>
    </div>
  </div>
);

export default TagihanContent;
