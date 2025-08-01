'use client';

import { useState } from 'react';
import { SavingTypeModel } from '@/app/shared/model/savingModel';
import { createSavingType, updateSavingType, deleteSavingType } from '@/app/shared/services/savingTypeService';

const mockData: SavingTypeModel[] = [
    new SavingTypeModel({ savingTypeId: 1, name: 'Navideño', description: 'Ahorro para navidad' }),
    new SavingTypeModel({ savingTypeId: 2, name: 'Educación', description: 'Ahorro para estudios' }),
];

export function useSavingType() {
    const [types, setTypes] = useState<SavingTypeModel[]>(mockData);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [typeToAction, setTypeToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ name: string; description: string }>({ name: '', description: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (savingTypeId: number, name: string, description: string) => {
        setSelectedEdit({ name, description });
        setTypeToAction(savingTypeId);
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

    const handleSaveEdit = async (name: string, description: string) => {
        setShowEditModal(false);
        if (typeToAction !== null) {
            const savingType = types.find((t) => t.savingTypeId === typeToAction);
            if (savingType) {
                const updated = new SavingTypeModel({ ...savingType, name, description });
                await updateSavingType(updated);
                setTypes((prev) => prev.map((t) => t.savingTypeId === updated.savingTypeId ? updated : t));
            }
        }
    };

    const handleCreateType = async (newData: { name: string; description: string }) => {
        const newType = new SavingTypeModel({ name: newData.name, description: newData.description });
        const saved = await createSavingType(newType);
        setTypes((prev) => [...prev, new SavingTypeModel(saved)]);
        setShowCreateModal(false);
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
