'use client';

import { useState } from 'react';
import { WithdrawalModel } from '@/app/shared/model/savingModel';
import { createWithdrawal, updateWithdrawal, deleteWithdrawal } from '@/app/shared/services/withdrawalService';

const mockData: WithdrawalModel[] = [
    new WithdrawalModel({ withdrawalId: 1, savingId: 1, amount: 10000, date: new Date() }),
    new WithdrawalModel({ withdrawalId: 2, savingId: 2, amount: 25000, date: new Date() }),
];

export function useWithdrawal() {
    const [withdrawals, setWithdrawals] = useState<WithdrawalModel[]>(mockData);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [withdrawalToAction, setWithdrawalToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ amount: number; date: string }>({ amount: 0, date: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (withdrawalId: number, amount: number, date: string) => {
        setSelectedEdit({ amount, date });
        setWithdrawalToAction(withdrawalId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setWithdrawalToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (withdrawalToAction !== null) {
            await deleteWithdrawal(withdrawalToAction);
            setWithdrawals((prev) => prev.filter((w) => w.withdrawalId !== withdrawalToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (amount: number, date: string) => {
        setShowEditModal(false);
        if (withdrawalToAction !== null) {
            const withdrawal = withdrawals.find((w) => w.withdrawalId === withdrawalToAction);
            if (withdrawal) {
                const updated = new WithdrawalModel({ ...withdrawal, amount, date: new Date(date) });
                await updateWithdrawal(updated);
                setWithdrawals((prev) => prev.map((w) => w.withdrawalId === updated.withdrawalId ? updated : w));
            }
        }
    };

    const handleCreateWithdrawal = async (newData: { amount: number; date: string }) => {
        const newWithdrawal = new WithdrawalModel({ amount: newData.amount, date: new Date(newData.date) });
        const saved = await createWithdrawal(newWithdrawal);
        setWithdrawals((prev) => [...prev, new WithdrawalModel(saved)]);
        setShowCreateModal(false);
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
