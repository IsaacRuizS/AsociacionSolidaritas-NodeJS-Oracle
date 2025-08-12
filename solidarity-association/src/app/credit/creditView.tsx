'use client';

import { useEffect } from 'react';
import { useCredit } from './useCredit';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';
import CreateCreditModal from './modals/createCreditModal';
import EditCreditModal from './modals/editCreditModal';

export default function CreditView() {
    const {
        credits,
        associates,
        statuses,
        showCreateModal,
        selectedEdit,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        handleEditClick,
        handleDeleteClick,
        handleConfirmDelete,
        handleSaveEdit,
        handleCreateCredit
    } = useCredit();

    return (
        <Sidebar>
            {/* Encabezado con botón de nuevo */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Créditos</h1>

                <button
                    className="flex items-center gap-2 bg-[#6D1D3C] text-white px-4 py-2 rounded-full hover:bg-[#50142c] transition"
                    onClick={() => setShowCreateModal(true)}
                >
                    <Icon path={mdiPlusCircleOutline} size={1} /> Nuevo
                </button>
            </div>

            {/* Tabla de créditos */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium text-left">
                        <tr>
                            <th className="px-4 py-3 text-center">ID</th>
                            <th className="px-4 py-3 text-center">Nombre</th>
                            <th className="px-4 py-3 text-center">Monto Solicitado</th>
                            <th className="px-4 py-3 text-center">Plazo (meses)</th>
                            <th className="px-4 py-3 text-center">Tasa (%)</th>
                            <th className="px-4 py-3 text-center">Saldo Actual</th>
                            <th className="px-4 py-3 text-center">Fecha Solicitud</th>
                            <th className="px-4 py-3 text-center">Fecha Aprobación</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credits.map((c) => (
                            <tr key={c.creditId} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{c.creditId}</td>
                                <td className="px-4 py-3 text-center">{c.name}</td>
                                <td className="px-4 py-3 text-center">{c.requestedAmount?.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center">{c.termMonths}</td>
                                <td className="px-4 py-3 text-center">{c.interestRate}</td>
                                <td className="px-4 py-3 text-center">{c.currentBalance?.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center">{c.requestDate ? new Date(c.requestDate).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-3 text-center">{c.approvalDate ? new Date(c.approvalDate).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div onClick={() => handleEditClick(c)} className="cursor-pointer">
                                            <Icon path={mdiPencil} size={1} />
                                        </div>
                                        <div onClick={() => handleDeleteClick(c.creditId!)} className="cursor-pointer">
                                            <Icon path={mdiTrashCan} size={1} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal crear */}
            <CreateCreditModal
                show={showCreateModal}
                associates={associates}
                creditStatuses={statuses}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateCredit}
            />

            {/* Modal editar */}
            <EditCreditModal
                show={showEditModal}
                associates={associates}
                creditStatuses={statuses}
                currentData={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />

            {/* Modal confirmar eliminación */}
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este crédito? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
