'use client';

import { useState } from 'react';
import { useSaving } from './useSaving';
import Sidebar from '@/components/Sidebar';
import Icon from '@mdi/react';
import { mdiCashPlus, mdiPlusCircleOutline } from '@mdi/js';
import CreateSavingModal from './modals/createSavingModal';

export default function SavingView() {
    const { savings } = useSaving();
    const [showModal, setShowModal] = useState(false);

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Ahorros</h1>
                <button
                    className="flex items-center gap-2 bg-[#6D1D3C] text-white px-4 py-2 rounded-full hover:bg-[#50142c] transition"
                    onClick={() => setShowModal(true)}
                >
                    <Icon path={mdiPlusCircleOutline} size={1} /> Nuevo
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium text-left">
                        <tr>
                            <th className="px-4 py-3 text-center">Id</th>
                            <th className="px-4 py-3 text-center">Descripción</th>
                            <th className="px-4 py-3 text-center">Objetivo</th>
                            <th className="px-4 py-3 text-center">Tasa interés</th>
                            <th className="px-4 py-3 text-center">Plazo</th>
                            <th className="px-4 py-3 text-center">Cambiar Couta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{a.id.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">{a.descripcion}</td>
                                <td className="px-4 py-3 text-center">₡{a.objetivo.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center">{a.interes}</td>
                                <td className="px-4 py-3 text-center">{a.plazo}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center">
                                        <Icon path={mdiCashPlus} size={1} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CreateSavingModal show={showModal} onClose={() => setShowModal(false)} />
        </Sidebar>
    );
}
