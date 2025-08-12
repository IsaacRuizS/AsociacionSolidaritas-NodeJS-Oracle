'use client';

import { useBeneficiary } from './useBeneficiary';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateBeneficiaryModal from '@/app/beneficiary/modals/createBeneficiaryModal';
import EditBeneficiaryModal from '@/app/beneficiary/modals/editBeneficiaryModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function BeneficiaryView() {
    const {
        beneficiaries,
        associates,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedBeneficiary,
        handleEditClick,
        handleSaveEdit,
        handleCreateBeneficiary,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete
    } = useBeneficiary();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Beneficiarios</h1>
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
                            <th className="px-4 py-3 text-center">ID</th>
                            <th className="px-4 py-3 text-center">Nombre completo</th>
                            <th className="px-4 py-3 text-center">Asociado</th>
                            <th className="px-4 py-3 text-center">Parentesco</th>
                            <th className="px-4 py-3 text-center">Teléfono</th>
                            <th className="px-4 py-3 text-center">Porcentaje</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beneficiaries.map((b, index) => (
                            <tr key={b.beneficiaryId ?? index} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{b.beneficiaryId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">
                                    {`${b.firstName ?? ''} ${b.lastName1 ?? ''} ${b.lastName2 ?? ''}`}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {
                                        associates.find(a => a.associateId === b.associateId)
                                            ? `${associates.find(a => a.associateId === b.associateId)?.firstName ?? ''} ${associates.find(a => a.associateId === b.associateId)?.lastName1 ?? ''} ${associates.find(a => a.associateId === b.associateId)?.lastName2 ?? ''}`
                                            : b.associateId
                                    }
                                </td>
                                <td className="px-4 py-3 text-center">{b.relationship}</td>
                                <td className="px-4 py-3 text-center">{b.phone}</td>
                                <td className="px-4 py-3 text-center">{b.percentage}%</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div onClick={() => handleEditClick(b.beneficiaryId!)}>
                                            <Icon path={mdiPencil} size={1} />
                                        </div>
                                        <div onClick={() => handleDeleteClick(b.beneficiaryId!)}>
                                            <Icon path={mdiTrashCan} size={1} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modales */}
            <CreateBeneficiaryModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateBeneficiary}
                associates={associates}
            />
            <EditBeneficiaryModal
                show={showEditModal}
                currentData={selectedBeneficiary}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
                associates={associates}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este beneficiario? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
