'use client';

import { useCredit } from './useCredit';
import Sidebar from '@/app/shared/components/Sidebar';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js';
import CreateCreditModal from './modals/createCreditModal';
import EditCreditModal from './modals/editCreditModal';
import ConfirmDeleteModal from '@/app/shared/components/confirmDeleteModal';

export default function CreditView() {
    const {
        credits,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateCredit,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete
    } = useCredit();

    return (
        <Sidebar>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937]">Créditos</h1>
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
                            <th className="px-4 py-3 text-center">Detalle</th>
                            <th className="px-4 py-3 text-center">Pendiente</th>
                            <th className="px-4 py-3 text-center">Monto Total</th>
                            <th className="px-4 py-3 text-center">Cuota</th>
                            <th className="px-4 py-3 text-center">Tasa Interés</th>
                            <th className="px-4 py-3 text-center">Plazo (Meses)</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credits.map((c) => (
                            <tr key={c.creditId} className="hover:bg-gray-50 border-t border-gray-200">
                                <td className="px-4 py-3 text-center">{c.creditId?.toString().padStart(2, '0')}</td>
                                <td className="px-4 py-3 text-center font-medium">{c.name}</td>
                                <td className="px-4 py-3 text-center">₡{c.requestedAmount?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">₡{c.currentBalance?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">₡{c.monthlyPayment?.toLocaleString('es-CR')}</td>
                                <td className="px-4 py-3 text-center">{c.interestRate?.toFixed(0)}%</td>
                                <td className="px-4 py-3 text-center">{c.termMonths}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div
                                            onClick={() =>
                                                handleEditClick(
                                                    c.creditId!,
                                                    c.monthlyPayment!,
                                                    c.termMonths!,
                                                    c.interestRate!,
                                                    c.requestedAmount!
                                                )
                                            }
                                        >
                                            <Icon path={mdiPencil} size={1} />
                                        </div>
                                        <div onClick={() => handleDeleteClick(c.creditId!)}>
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
            <CreateCreditModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateCredit}
            />
            <EditCreditModal
                show={showEditModal}
                currentEdit={selectedEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            /> 
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="¿Deseas eliminar este crédito? Esta acción no se puede deshacer."
            />
        </Sidebar>
    );
}
