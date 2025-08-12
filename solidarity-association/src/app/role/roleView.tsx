'use client';

import { useRole } from './useRole';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateRoleModal from './modals/createRoleModal';
import EditRoleModal from './modals/editRoleModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function RoleView() {
    const {
        roles,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateRole,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    } = useRole();

    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Roles</h1>
                <button
                    className="flex items-center gap-2 bg-[#6D1D3C] text-white px-4 py-2 rounded-full hover:bg-[#50142c] transition"
                    onClick={() => setShowCreateModal(true)}
                >
                    <Icon path={mdiPlusCircleOutline} size={1} /> Nuevo
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium text-left">
                        <tr>
                            <th className="px-4 py-3 text-center">Id</th>
                            <th className="px-4 py-3 text-center">Nombre</th>
                            <th className="px-4 py-3 text-center">Descripción</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((r, index) => (
                            <tr key={r.roleId ?? index} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{r.roleId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">{r.name}</td>
                                <td className="px-4 py-3 text-center">{r.description}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button type="button" onClick={() => handleEditClick(r.roleId!)}>
                                            <Icon path={mdiPencil} size={1} />
                                        </button>
                                        <button type="button" onClick={() => handleDeleteClick(r.roleId!)}>
                                            <Icon path={mdiTrashCan} size={1} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CreateRoleModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateRole}
            />

            <EditRoleModal
                show={showEditModal}
                currentEdit={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este rol? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
