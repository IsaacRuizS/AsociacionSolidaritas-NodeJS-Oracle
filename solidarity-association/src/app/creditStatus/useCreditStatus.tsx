'use client';

import { useEffect, useState } from 'react';
import { CreditStatusModel } from '@/app/shared/model/creditModel';
import { createCreditStatus, updateCreditStatus, deleteCreditStatus, getCreditStatuses } from '@/app/shared/services/creditStatusService';

export function useCreditStatus() {
    const [statuses, setStatuses] = useState<CreditStatusModel[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [statusToAction, setStatusToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<CreditStatusModel>(new CreditStatusModel({ description: '' }));

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Cargar estados de crédito desde API
    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const data = await getCreditStatuses();
                setStatuses(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchStatuses();
    }, []);

    const handleEditClick = (status: CreditStatusModel) => {
        setSelectedEdit(status);
        setStatusToAction(status.statusId ?? null);
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

    const handleSaveEdit = async (status: CreditStatusModel) => {

        await updateCreditStatus(status);
        setShowEditModal(false);

        //recargar data
        const data = await getCreditStatuses();
        setStatuses(data);
    };

    const handleCreateStatus = async (status: CreditStatusModel) => {

        const saved = await createCreditStatus(status);
        setShowCreateModal(false);
        
        //recargar data
        const data = await getCreditStatuses();
        setStatuses(data);
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
