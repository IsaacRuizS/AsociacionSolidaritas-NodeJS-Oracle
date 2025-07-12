'use client';

import { useSaving } from './useSaving';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiCashPlus, mdiPlusCircleOutline, mdiTrashCan } from '@mdi/js';
import CreateSavingModal from './modals/createSavingModal';
import EditCuotaModal from './modals/editCuotaModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function SavingView() {

    const { savings, showCreateModal, setShowCreateModal, showEditModal, setShowEditModal, selectedCuota, handleEditClick, handleSaveCuota, handleCreateSaving, showDeleteModal, setShowDeleteModal, handleDeleteClick, handleConfirmDelete } = useSaving();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Ahorros</h1>
                <button
                    className="flex items-center gap-2 bg-[#6D1D3C] text-white px-4 py-2 rounded-full hover:bg-[#50142c] transition"
                    onClick={() => setShowCreateModal(true)}
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
                            <th className="px-4 py-3 text-center">Saldo actual</th>
                            <th className="px-4 py-3 text-center">Siguiente</th>
                            <th className="px-4 py-3 text-center">Tasa interés</th>
                            <th className="px-4 py-3 text-center">Plazo</th>
                            <th className="px-4 py-3 text-center">Cambiar Couta</th>
                            <th className="px-4 py-3 text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((a) => (
                            <tr key={a.savingId} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{a.savingId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">{a.name}</td>
                                <td className="px-4 py-3 text-center">₡{a.currentBalance?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">₡{a.monthlyAmount?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">{a.interestRate?.toString()}</td>
                                <td className="px-4 py-3 text-center">{a.deadline?.toString().slice(0, 10)}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center" onClick={() => handleEditClick(a.savingId!, a.monthlyAmount!)}>
                                        <Icon path={mdiCashPlus} size={1} />
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center" onClick={() => handleDeleteClick(a.savingId!)}>
                                        <Icon path={mdiTrashCan} size={1} />
                                    </div>
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>

            <CreateSavingModal 
                show={showCreateModal} 
                onClose={() => setShowCreateModal(false)} 
                onCreate={handleCreateSaving} />
            <EditCuotaModal
                show={showEditModal}
                currentCuota={selectedCuota}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveCuota}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este ahorro? Esta acción no se puede deshacer."
            />

        </Sidebar>
    );
}
