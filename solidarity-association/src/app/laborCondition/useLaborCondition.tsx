'use client';

import { useEffect, useState } from 'react';
import { LaborConditionModel } from '@/app/shared/model/laborConditionModel';
import {createLaborCondition,updateLaborCondition,deleteLaborCondition,getLaborConditions} from '@/app/shared/services/laborConditionService';

export function useLaborCondition() {

    const [conditions, setConditions] = useState<LaborConditionModel[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [conditionToAction, setConditionToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<LaborConditionModel | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Cargar condiciones laborales desde API
    useEffect(() => {
        const fetchLaborConditions = async () => {
            try {
                const data = await getLaborConditions();
                setConditions(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchLaborConditions();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (conditionId: number) => {
        const condition = conditions.find((c) => c.conditionId === conditionId);
        if (condition) {
            setSelectedEdit(condition);
            setShowEditModal(true);
        }
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setConditionToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (conditionToAction !== null) {
            await deleteLaborCondition(conditionToAction);
            setConditions((prev) => prev.filter((c) => c.conditionId !== conditionToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar cambios de edición
    const handleSaveEdit = async (updatedCondition: LaborConditionModel) => {
        await updateLaborCondition(updatedCondition);
        setShowEditModal(false);

        const newData = await getLaborConditions();
        setConditions(newData);
    };

    // Crear nueva condición laboral
    const handleCreateCondition = async (newCondition: LaborConditionModel) => {
        await createLaborCondition(newCondition);
        setShowCreateModal(false);

        const newData = await getLaborConditions();
        setConditions(newData);
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
