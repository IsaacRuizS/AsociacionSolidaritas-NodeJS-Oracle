'use client';

import { useEffect, useState } from 'react';
import { SavingModel } from '@/app/shared/model/savingModel';
import { getSavings, createSaving, deleteSaving, updateSaving } from '../shared/services/savingService';

export function useSaving() {
    const [savings, setSavings] = useState<SavingModel[]>([]);

    // Modales
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState<SavingModel | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [savingToAction, setSavingToAction] = useState<number | null>(null);

    // Cargar ahorros desde API
    useEffect(() => {
        const fetchSavings = async () => {
            try {
                const data = await getSavings();
                setSavings(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchSavings();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (savingId: number) => {
        const saving = savings.find((s) => s.savingId === savingId);
        if (saving) {
            setSelectedEdit(saving);
            setShowEditModal(true);
        }
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setSavingToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (savingToAction !== null) {
            await deleteSaving(savingToAction);
            setSavings((prev) => prev.filter((s) => s.savingId !== savingToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar cambios en un ahorro
    const handleSaveEdit = async (updatedSaving: SavingModel) => {
        await updateSaving(updatedSaving);
        setShowEditModal(false);

        const newData = await getSavings();
        setSavings(newData);
    };

    // Crear un nuevo ahorro
    const handleCreateSaving = async (newSaving: SavingModel) => {
        await createSaving(newSaving);
        setShowCreateModal(false);

        const newData = await getSavings();
        setSavings(newData);
    };

    return {
        savings,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateSaving,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
