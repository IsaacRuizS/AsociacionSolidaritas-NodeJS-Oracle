'use client';

import { useSavingType } from './useSavingType';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateSavingTypeModal from './modals/createSavingTypeModal';
import EditSavingTypeModal from './modals/editSavingTypeModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';
import { SavingTypeModel } from '@/app/shared/model/savingModel';

export default function SavingTypeView() {
    const {
        types,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateType,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    } = useSavingType();

    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Tipos de Ahorro</h1>
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
                        {types.map((t: SavingTypeModel) => (
                            <tr key={t.savingTypeId} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{t.savingTypeId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">{t.name}</td>
                                <td className="px-4 py-3 text-center">{t.description}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div onClick={() => handleEditClick(t)}>
                                            <Icon path={mdiPencil} size={1} />
                                        </div>
                                        <div onClick={() => handleDeleteClick(t.savingTypeId!)}>
                                            <Icon path={mdiTrashCan} size={1} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CreateSavingTypeModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={(data) =>
                    handleCreateType(data)
                }
            />
            <EditSavingTypeModal
                show={showEditModal}
                currentEdit={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={(updated) => handleSaveEdit(updated)}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este tipo de ahorro? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
