import {
  FaMoneyBillWave,
  FaArrowDown,
  FaHistory,
  FaFilter,
  FaPrint,
  FaFileExport,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const RiwayatSaldoContent = () => {
  // Data contoh riwayat transaksi
  const transactions = [
    {
      id: "TRX-2023-001",
      date: "2023-01-05",
      type: "topup",
      amount: 500000,
      method: "Transfer Bank",
      status: "completed",
      description: "Isi saldo oleh orang tua",
    },
    {
      id: "TRX-2023-002",
      date: "2023-01-10",
      type: "payment",
      amount: -75000,
      method: "Saldo Sekolah",
      status: "completed",
      description: "Pembayaran SPP Januari",
    },
    {
      id: "TRX-2023-003",
      date: "2023-01-15",
      type: "payment",
      amount: -120000,
      method: "Saldo Sekolah",
      status: "completed",
      description: "Pembelian buku pelajaran",
    },
    {
      id: "TRX-2023-004",
      date: "2023-01-20",
      type: "topup",
      amount: 300000,
      method: "Tunai",
      status: "completed",
      description: "Setoran orang tua",
    },
    {
      id: "TRX-2023-005",
      date: "2023-01-25",
      type: "refund",
      amount: 50000,
      method: "Saldo Sekolah",
      status: "completed",
      description: "Pengembalian dana kegiatan",
    },
    {
      id: "TRX-2023-006",
      date: "2023-02-01",
      type: "payment",
      amount: -100000,
      method: "Saldo Sekolah",
      status: "pending",
      description: "Pembayaran ekstrakurikuler",
    },
  ];

  // Hitung saldo
  const saldoAwal = 1000000;
  const totalTopup = transactions
    .filter((t) => t.type === "topup" || t.type === "refund")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPayment = transactions
    .filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const saldoAkhir = saldoAwal + totalTopup - totalPayment;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" />
          Riwayat Saldo dan Transaksi
        </h3>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <FaFileExport className="text-gray-500" />
            Export
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <FaPrint className="text-gray-500" />
            Cetak
          </button>
        </div>
      </div>

      {/* Ringkasan Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo Awal</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                Rp {saldoAwal.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FaHistory className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Pemasukan
              </p>
              <p className="mt-1 text-xl font-semibold text-green-600">
                + Rp {totalTopup.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <FaArrowDown className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo Akhir</p>
              <p className="mt-1 text-xl font-semibold text-blue-600">
                Rp {saldoAkhir.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FaMoneyBillWave className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter dan Pencarian */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cari transaksi..."
            />
          </div>
          <select className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Semua Jenis</option>
            <option>Pemasukan</option>
            <option>Pengeluaran</option>
          </select>
          <select className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Semua Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Daftar Transaksi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID Transaksi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jenis
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jumlah
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Metode
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {transaction.type}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    Rp {Math.abs(transaction.amount).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status === "completed"
                        ? "Selesai"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">1</span> sampai{" "}
              <span className="font-medium">6</span> dari{" "}
              <span className="font-medium">6</span> transaksi
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <FaArrowLeft className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <FaArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatSaldoContent;
