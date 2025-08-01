'use client';

import { useState } from 'react';
import { CreditStatusModel } from '@/app/shared/model/creditModel';
import { createCreditStatus, updateCreditStatus, deleteCreditStatus } from '@/app/shared/services/creditStatusService';

const mockData: CreditStatusModel[] = [
    new CreditStatusModel({ statusId: 1, description: 'Activo' }),
    new CreditStatusModel({ statusId: 2, description: 'En mora' }),
    new CreditStatusModel({ statusId: 3, description: 'Cancelado' }),
];

export function useCreditStatus() {
    const [statuses, setStatuses] = useState<CreditStatusModel[]>(mockData);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [statusToAction, setStatusToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ description: string }>({
        description: '',
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (statusId: number, description: string) => {
        setSelectedEdit({ description });
        setStatusToAction(statusId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setStatusToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (statusToAction !== null) {
            await deleteCreditStatus(statusToAction);
            setStatuses((prev) => prev.filter((s) => s.statusId !== statusToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (description: string) => {
        setShowEditModal(false);

        if (statusToAction !== null) {
            const status = statuses.find((s) => s.statusId === statusToAction);
            if (status) {
                const updated = new CreditStatusModel({
                    ...status,
                    description,
                });
                await updateCreditStatus(updated);
                setStatuses((prev) =>
                    prev.map((s) => s.statusId === updated.statusId ? updated : s)
                );
            }
        }
    };

    const handleCreateStatus = async (newData: { description: string }) => {
        const newStatus = new CreditStatusModel({ description: newData.description });
        const saved = await createCreditStatus(newStatus);
        setStatuses((prev) => [...prev, new CreditStatusModel(saved)]);
        setShowCreateModal(false);
    };

    return {
        statuses,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateStatus,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}