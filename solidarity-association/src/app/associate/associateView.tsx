'use client';

import { useAssociate } from '@/app/associate/useAssociate'; 
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateAssociateModal from '@/app/associate/modals/createAssociateModal';
import EditAssociateModal from '@/app/associate/modals/editAssociateModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function AssociateView() {
    const {
        associates,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedAssociate,
        handleEditClick,
        handleSaveEdit,
        handleCreateAssociate,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete
    } = useAssociate();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Asociados</h1>
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
                            <th className="px-4 py-3 text-center">Correo</th>
                            <th className="px-4 py-3 text-center">Teléfono</th>
                            <th className="px-4 py-3 text-center">Fecha ingreso</th>
                            <th className="px-4 py-3 text-center">Salario bruto</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {associates.map((a) => (
                            <tr key={a.associateId} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{a.associateId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">
                                    {`${a.firstName ?? ''} ${a.lastName1 ?? ''} ${a.lastName2 ?? ''}`}
                                </td>
                                <td className="px-4 py-3 text-center">{a.email}</td>
                                <td className="px-4 py-3 text-center">{a.phone}</td>
                                <td className="px-4 py-3 text-center">
                                    {a.entryDate?.toLocaleDateString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    ₡{a.grossSalary?.toLocaleString('es-CR')}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div onClick={() => handleEditClick(a.associateId!)}>
                                            <Icon path={mdiPencil} size={1} />
                                        </div>
                                        <div onClick={() => handleDeleteClick(a.associateId!)}>
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
            <CreateAssociateModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateAssociate}
            />
            <EditAssociateModal
                show={showEditModal}
                currentData={selectedAssociate}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este asociado? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
