'use client';

import { useSavingContribution } from './useSavingContribution';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateSavingContributionModal from './modals/createSavingContributionModal';
import EditSavingContributionModal from './modals/editSavingContributionModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function SavingContributionView() {
    const {
        contributions,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        savings,
        handleEditClick,
        handleSaveEdit,
        handleCreateContribution,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    } = useSavingContribution();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Aportes a Ahorros</h1>
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
                        {contributions.map((c, index) => (
                            <tr
                                key={c.contributionId ?? index}
                                className="hover:bg-gray-50 border-t border-gray-200"
                            >
                                <td className="px-4 py-3 text-center">
                                    {c.contributionId?.toString().padStart(2, '0')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {c.savingId ? savings.find(s => s.savingId === c.savingId)?.name : 'N/A'}
                                </td>
                                <td className="px-4 py-3 text-center font-medium">
                                    ₡{c.amount?.toLocaleString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {c.date
                                        ? new Date(c.date).toLocaleDateString('es-CR')
                                        : ''}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEditClick(c.contributionId!)}
                                        >
                                            <Icon path={mdiPencil} size={1} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(c.contributionId!)}
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
            <CreateSavingContributionModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateContribution}
                savings={savings}
            />
            <EditSavingContributionModal
                show={showEditModal}
                currentEdit={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este aporte? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
