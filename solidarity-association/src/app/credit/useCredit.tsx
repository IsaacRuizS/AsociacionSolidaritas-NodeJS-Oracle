'use client';

import { useEffect, useState } from 'react';
import { CreditModel, CreditStatusModel } from '@/app/shared/model/creditModel';
import { createCredit, deleteCredit, updateCredit, getCredits } from '@/app/shared/services/creditService';
import { AssociateModel } from '../shared/model/associateModel';
import { getAssociates } from '../shared/services/associateService';
import { getCreditStatuses } from '../shared/services/creditStatusService';

export function useCredit() {

    const [credits, setCredits] = useState<CreditModel[]>([]);
    const [statuses, setStatuses] = useState<CreditStatusModel[]>([]);
    const [associates, setAssociates] = useState<AssociateModel[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [creditToAction, setCreditToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<CreditModel>(new CreditModel());

    // Efecto para obtener créditos
    useEffect(() => {

        const fetchCredits = async () => {

            try {

                const data = await getCredits();
                setCredits(data);

                const associates = await getAssociates();
                setAssociates(associates);

                const creditStatus = await getCreditStatuses();
                setStatuses(creditStatus);

            } catch (err: any) {
                console.error(err);
            } 
        };

        fetchCredits();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (credit: CreditModel) => {
        setSelectedEdit(credit);
        setCreditToAction(credit.creditId ?? null);
        setShowEditModal(true);
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setCreditToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (creditToAction !== null) {
            await deleteCredit(creditToAction);
            setCredits((prev) => prev.filter((c) => c.creditId !== creditToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar edición
    const handleSaveEdit = async (updated: CreditModel) => {
        setShowEditModal(false);
        if (creditToAction !== null) {
            await updateCredit(updated);
            setCredits((prev) =>
                prev.map((c) => c.creditId === updated.creditId ? updated : c)
            );
        }
    };

    // Crear nuevo
    const handleCreateCredit = async (newCredit: CreditModel) => {
        const saved = await createCredit(newCredit);
        setCredits((prev) => [...prev, new CreditModel(saved)]);
        setShowCreateModal(false);
    };

    return {
        credits,
        associates,
        statuses,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateCredit,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
