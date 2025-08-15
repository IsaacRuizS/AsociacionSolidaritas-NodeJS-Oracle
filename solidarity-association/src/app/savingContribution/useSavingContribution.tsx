'use client';

import { useState, useEffect } from 'react';
import { SavingContributionModel, SavingModel } from '@/app/shared/model/savingModel';
import {
    createSavingContribution,
    updateSavingContribution,
    deleteSavingContribution,
    getSavingContributions
} from '@/app/shared/services/savingContributionService';
import { getSavings } from '@/app/shared/services/savingService';

export function useSavingContribution() {
    const [contributions, setContributions] = useState<SavingContributionModel[]>([]);
    const [savings, setSavings] = useState<SavingModel[]>([]);

    // Modales
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState<SavingContributionModel | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contributionToAction, setContributionToAction] = useState<number | null>(null);

    // Cargar aportes desde API
    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const data = await getSavingContributions();
                setContributions(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContributions();

        const fetchSavings = async () => {
            try {
                const data = await getSavings();
                setSavings(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSavings();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (contributionId: number) => {
        const contribution = contributions.find((c) => c.contributionId === contributionId);
        if (contribution) {
            setSelectedEdit(contribution);
            setShowEditModal(true);
        }
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setContributionToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (contributionToAction !== null) {
            await deleteSavingContribution(contributionToAction);
            setContributions((prev) => prev.filter((c) => c.contributionId !== contributionToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar cambios de edición
    const handleSaveEdit = async (updatedContribution: SavingContributionModel) => {
        await updateSavingContribution(updatedContribution);
        setShowEditModal(false);

        const data = await getSavingContributions();
        setContributions(data);
    };

    // Crear nuevo aporte
    const handleCreateContribution = async (newContribution: SavingContributionModel) => {
        await createSavingContribution(newContribution);
        setShowCreateModal(false);

        const data = await getSavingContributions();
        setContributions(data);
    };

    return {
        contributions,
        savings,
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
