'use client';

import { useEffect, useState } from 'react';
import { WithdrawalModel } from '@/app/shared/model/savingModel';
import {
    createWithdrawal,
    updateWithdrawal,
    deleteWithdrawal,
    getWithdrawals
} from '@/app/shared/services/withdrawalService';

export function useWithdrawal() {
    const [withdrawals, setWithdrawals] = useState<WithdrawalModel[]>([]);

    // Modales
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState<WithdrawalModel | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [withdrawalToAction, setWithdrawalToAction] = useState<number | null>(null);

    // Cargar retiros desde API
    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const data = await getWithdrawals();
                setWithdrawals(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchWithdrawals();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (withdrawalId: number) => {
        const withdrawal = withdrawals.find((w) => w.withdrawalId === withdrawalId);
        if (withdrawal) {
            setSelectedEdit(withdrawal);
            setShowEditModal(true);
        }
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setWithdrawalToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (withdrawalToAction !== null) {
            await deleteWithdrawal(withdrawalToAction);
            setWithdrawals((prev) => prev.filter((w) => w.withdrawalId !== withdrawalToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar cambios
    const handleSaveEdit = async (updatedWithdrawal: WithdrawalModel) => {
        await updateWithdrawal(updatedWithdrawal);
        setShowEditModal(false);

        const data = await getWithdrawals();
        setWithdrawals(data);
    };

    // Crear nuevo retiro
    const handleCreateWithdrawal = async (newWithdrawal: WithdrawalModel) => {
        await createWithdrawal(newWithdrawal);
        setShowCreateModal(false);

        const data = await getWithdrawals();
        setWithdrawals(data);
    };

    return {
        withdrawals,
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
    };
}
