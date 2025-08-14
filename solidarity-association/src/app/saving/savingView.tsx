'use client';

import { useSaving } from './useSaving';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateSavingModal from './modals/createSavingModal';
import EditSavingModal from './modals/editSavingModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function SavingView() {
    const {
        savings,
        types,
        associates,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateSaving,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    } = useSaving();

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
                            <th className="px-4 py-3 text-center">Cuota mensual</th>
                            <th className="px-4 py-3 text-center">Tasa interés</th>
                            <th className="px-4 py-3 text-center">Interés generado</th>
                            <th className="px-4 py-3 text-center">Plazo</th>
                            <th className="px-4 py-3 text-center">Tipo</th>
                            <th className="px-4 py-3 text-center">Asociado</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((s, index) => (
                            <tr
                                key={s.savingId ?? index}
                                className="hover:bg-gray-50 border-t border-gray-200"
                            >
                                <td className="px-4 py-3 text-center">
                                    {s.savingId?.toString().padStart(2, '0')}
                                </td>
                                <td className="px-4 py-3 text-center font-medium">{s.name}</td>
                                <td className="px-4 py-3 text-center">
                                    ₡{s.currentBalance?.toLocaleString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    ₡{s.monthlyAmount?.toLocaleString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">{s.interestRate}%</td>
                                <td className="px-4 py-3 text-center">₡{s.generatedInterest?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">
                                    {s.deadline
                                        ? new Date(s.deadline).toISOString().split('T')[0]
                                        : ''}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {s.savingTypeId && types.find((t) => t.savingTypeId === s.savingTypeId)?.name}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {(() => {
                                        const associate = s.associateId && associates.find((a) => a.associateId === s.associateId);
                                        return associate
                                            ? `${associate.firstName ?? ''} ${associate.lastName1 ?? ''} ${associate.lastName2 ?? ''}`.trim()
                                            : '';
                                    })()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEditClick(s.savingId!)}
                                        >
                                            <Icon path={mdiPencil} size={1} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(s.savingId!)}
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
            <CreateSavingModal
                show={showCreateModal}
                types={types}
                associates={associates}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateSaving}
            />

            <EditSavingModal
                show={showEditModal}
                types={types}
                associates={associates}
                currentEdit={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
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
