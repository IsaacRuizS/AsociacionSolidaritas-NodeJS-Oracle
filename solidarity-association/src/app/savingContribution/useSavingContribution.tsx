'use client';

import { useState } from 'react';
import { SavingContributionModel } from '@/app/shared/model/savingModel';
import { createSavingContribution, updateSavingContribution, deleteSavingContribution } from '@/app/shared/services/savingContributionService';

const mockData: SavingContributionModel[] = [
    new SavingContributionModel({ contributionId: 1, savingId: 1, amount: 5000, date: new Date() }),
    new SavingContributionModel({ contributionId: 2, savingId: 1, amount: 7500, date: new Date() }),
];

export function useSavingContribution() {
    const [contributions, setContributions] = useState<SavingContributionModel[]>(mockData);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [contributionToAction, setContributionToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ amount: number; date: string }>({ amount: 0, date: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (contributionId: number, amount: number, date: string) => {
        setSelectedEdit({ amount, date });
        setContributionToAction(contributionId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setContributionToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (contributionToAction !== null) {
            await deleteSavingContribution(contributionToAction);
            setContributions((prev) => prev.filter((c) => c.contributionId !== contributionToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (amount: number, date: string) => {
        setShowEditModal(false);
        if (contributionToAction !== null) {
            const contribution = contributions.find((c) => c.contributionId === contributionToAction);
            if (contribution) {
                const updated = new SavingContributionModel({ ...contribution, amount, date: new Date(date) });
                await updateSavingContribution(updated);
                setContributions((prev) => prev.map((c) => c.contributionId === updated.contributionId ? updated : c));
            }
        }
    };

    const handleCreateContribution = async (newData: { amount: number; date: string }) => {
        const newContribution = new SavingContributionModel({ amount: newData.amount, date: new Date(newData.date) });
        const saved = await createSavingContribution(newContribution);
        setContributions((prev) => [...prev, new SavingContributionModel(saved)]);
        setShowCreateModal(false);
    };

    return {
        contributions,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateContribution,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
