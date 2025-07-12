'use client';

import { useState, useEffect } from 'react';
import { SavingModel } from '@/app/shared/model/savingModel';
import { getSavings, createSaving, deleteSaving, updateSaving } from '../shared/services/savingService';

const mockData: SavingModel[] = [
    new SavingModel({ savingId: 1, name: 'Motorcycle Saving', currentBalance: 1000000, monthlyAmount: 20000, interestRate: 6, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 2, name: 'Car Saving', currentBalance: 1000000, monthlyAmount: 20000, interestRate: 5, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 3, name: 'Christmas Saving', currentBalance: 900000, monthlyAmount: 10000, interestRate: 4, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 4, name: 'Marchamo', currentBalance: 900000, monthlyAmount: 10000, interestRate: 4, deadline: new Date('2026-01-12') }),
];

export function useSaving() {
    const [savings, setSavings] = useState<SavingModel[]>([]);

    useEffect(() => {
        getSavings().then((data) => setSavings(data));
    }, []);

    console.log(savings)

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCuota, setSelectedCuota] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [savingToAction, setSavingToAction] = useState<number | null>(null);

    const handleEditClick = (savingId: number, cuota: number) => {
        setSelectedCuota(cuota);
        setSavingToAction(savingId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setSavingToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (savingToAction !== null) {
            await deleteSaving(savingToAction); // llamada al servicio
            setSavings((prev) => prev.filter((s) => s.savingId !== savingToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveCuota = async (newCuota: number) => {
        setShowEditModal(false);
    
        if (savingToAction !== null) {
            const saving = savings.find((s) => s.savingId === savingToAction);
            if (saving) {
                const updated = new SavingModel({ ...saving, monthlyAmount: newCuota });
                await updateSaving(updated); // llamada al servicio
                setSavings((prev) =>
                    prev.map((s) => s.savingId === updated.savingId ? updated : s)
                );
            }
        }
    };

    const handleCreateSaving = async (newData: { descripcion: string; cuota: number; fecha: string }) => {
        const newSaving = new SavingModel({
            name: newData.descripcion,
            monthlyAmount: newData.cuota,
            deadline: new Date(newData.fecha),
            currentBalance: 0,
            interestRate: 6
        });
    
        const saved = await createSaving(newSaving); // llamada al servicio
    
        setSavings((prev) => [...prev, new SavingModel(saved)]);
        setShowCreateModal(false);
    }; 

    return {
        savings,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedCuota,
        handleEditClick,
        handleSaveCuota,
        handleCreateSaving,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
