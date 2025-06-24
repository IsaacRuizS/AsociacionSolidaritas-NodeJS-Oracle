'use client';

import { useSaving } from './useSaving';
import Sidebar from '@/components/Sidebar';
import { Plus, Filter, Search } from 'lucide-react'; // npm install lucide-react si no lo tienes

export default function SavingView() {
    const { savings, tab, setTab, handleSearch, currentPage, setCurrentPage } = useSaving();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Ahorros y Préstamos</h1>
                <button className="flex items-center gap-2 bg-[#6D1D3C] text-white px-4 py-2 rounded-full hover:bg-[#50142c] transition">
                    <Plus size={18} /> Nuevo
                </button>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
                <nav className="flex gap-6">
                    <button
                        onClick={() => setTab('ahorro')}
                        className={`pb-2 font-medium transition ${tab === 'ahorro'
                                ? 'border-b-2 border-[#6D1D3C] text-[#6D1D3C]'
                                : 'text-gray-500 hover:text-[#6D1D3C]'
                            }`}
                    >
                        Ahorro
                    </button>
                    <button
                        onClick={() => setTab('prestamo')}
                        className={`pb-2 font-medium transition ${tab === 'prestamo'
                                ? 'border-b-2 border-[#6D1D3C] text-[#6D1D3C]'
                                : 'text-gray-500 hover:text-[#6D1D3C]'
                            }`}
                    >
                        Préstamo
                    </button>
                </nav>
            </div>

            {/* Filtro */}
            <div className="mb-4 flex justify-between items-center">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Buscar"
                        onChange={handleSearch}
                        className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D1D3C]"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                    <Filter size={16} />
                    Filtrar
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium text-left">
                        <tr>
                            <th className="px-4 py-3">Id</th>
                            <th className="px-4 py-3">Descripción</th>
                            <th className="px-4 py-3">Objetivo</th>
                            <th className="px-4 py-3">Siguiente ahorro</th>
                            <th className="px-4 py-3">Tasa interés</th>
                            <th className="px-4 py-3">Plazo</th>
                            <th className="px-4 py-3">Extraordinario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50 border-b">
                                <td className="px-4 py-3">{a.id.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 font-medium">{a.descripcion}</td>
                                <td className="px-4 py-3">₡{a.objetivo.toLocaleString()}</td>
                                <td className="px-4 py-3">₡{a.siguiente.toLocaleString()}</td>
                                <td className="px-4 py-3">{a.interes}</td>
                                <td className="px-4 py-3">{a.plazo}</td>
                                <td className="px-4 py-3 text-center">✏️</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
                >
                    ← Anterior
                </button>

                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            onClick={() => setCurrentPage(n)}
                            className={`px-3 py-1 rounded-full text-sm ${currentPage === n
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
                >
                    Siguiente →
                </button>
            </div>
        </Sidebar>
    );
}
