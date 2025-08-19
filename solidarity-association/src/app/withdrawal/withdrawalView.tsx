'use client';

import { useWithdrawal } from './useWithdrawal';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateWithdrawalModal from './modals/createWithdrawalModal';
import EditWithdrawalModal from './modals/editWithdrawalModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function WithdrawalView() {
    const {
        withdrawals,
        savings,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateWithdrawal,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    } = useWithdrawal();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Retiros</h1>
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
                            <th className="px-4 py-3 text-center">Ahorro</th>
                            <th className="px-4 py-3 text-center">Monto</th>
                            <th className="px-4 py-3 text-center">Fecha</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals.map((w, index) => (
                            <tr
                                key={w.withdrawalId ?? index}
                                className="hover:bg-gray-50 border-t border-gray-200"
                            >
                                <td className="px-4 py-3 text-center">
                                    {w.withdrawalId?.toString().padStart(2, '0')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {w.savingId ? savings.find(s => s.savingId === w.savingId)?.name : 'N/A'}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    ₡{w.amount?.toLocaleString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {w.date ? new Date(w.date).toLocaleDateString('es-CR') : ''}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEditClick(w.withdrawalId!)}
                                        >
                                            <Icon path={mdiPencil} size={1} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(w.withdrawalId!)}
                                        >
                                            <Icon path={mdiTrashCan} size={1} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modales */}
            <CreateWithdrawalModal
                show={showCreateModal}
                savings={savings}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateWithdrawal}
            />
            <EditWithdrawalModal
                show={showEditModal}
                currentEdit={selectedEdit}
                savings={savings}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este retiro? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
