'use client';

import { useState } from 'react';
import { LaborConditionModel } from '@/app/shared/model/laborConditionModel';
import { createLaborCondition, updateLaborCondition, deleteLaborCondition } from '@/app/shared/services/laborConditionService';

const mockData: LaborConditionModel[] = [
    new LaborConditionModel({ conditionId: 1, description: 'Tiempo completo' }),
    new LaborConditionModel({ conditionId: 2, description: 'Medio tiempo' }),
    new LaborConditionModel({ conditionId: 3, description: 'Contrato' }),
];

export function useLaborCondition() {
    const [conditions, setConditions] = useState<LaborConditionModel[]>(mockData);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [conditionToAction, setConditionToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ description: string }>({ description: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (conditionId: number, description: string) => {
        setSelectedEdit({ description });
        setConditionToAction(conditionId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setConditionToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (conditionToAction !== null) {
            await deleteLaborCondition(conditionToAction);
            setConditions((prev) => prev.filter((c) => c.conditionId !== conditionToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (description: string) => {
        setShowEditModal(false);
        if (conditionToAction !== null) {
            const condition = conditions.find((c) => c.conditionId === conditionToAction);
            if (condition) {
                const updated = new LaborConditionModel({ ...condition, description });
                await updateLaborCondition(updated);
                setConditions((prev) =>
                    prev.map((c) => c.conditionId === updated.conditionId ? updated : c)
                );
            }
        }
    };

    const handleCreateCondition = async (newData: { description: string }) => {
        const newCondition = new LaborConditionModel({ description: newData.description });
        const saved = await createLaborCondition(newCondition);
        setConditions((prev) => [...prev, new LaborConditionModel(saved)]);
        setShowCreateModal(false);
    };

    return {
        conditions,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateCondition,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
