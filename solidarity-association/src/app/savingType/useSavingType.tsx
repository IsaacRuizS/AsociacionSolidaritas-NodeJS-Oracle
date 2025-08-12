'use client';

import { useEffect, useState } from 'react';
import { SavingTypeModel } from '@/app/shared/model/savingModel';
import { createSavingType, updateSavingType, deleteSavingType, getSavingTypes } from '@/app/shared/services/savingTypeService';

export function useSavingType() {

    const [types, setTypes] = useState<SavingTypeModel[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [typeToAction, setTypeToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<SavingTypeModel>(new SavingTypeModel());
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Cargar tipos de ahorro desde API
    useEffect(() => {
        const fetchSavingTypes = async () => {
            try {
                const data = await getSavingTypes();
                setTypes(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchSavingTypes();
    }, []);

    const handleEditClick = (type: SavingTypeModel) => {
        setSelectedEdit(type);
        setTypeToAction(type.savingTypeId ?? null);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setTypeToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (typeToAction !== null) {
            await deleteSavingType(typeToAction);
            setTypes((prev) => prev.filter((t) => t.savingTypeId !== typeToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (updatedType: SavingTypeModel) => {

        await updateSavingType(updatedType);
        setShowEditModal(false);

        const data = await getSavingTypes();
        setTypes(data);
    };

    const handleCreateType = async (newType: SavingTypeModel) => {
        
        const saved = await createSavingType(newType);
        setShowCreateModal(false);

        const data = await getSavingTypes();
        setTypes(data);
    };

    return {
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
    };
}
