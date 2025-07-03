'use client';

import { useState } from 'react';
import { SavingModel } from '@/app/model/savingModel';

const mockData: SavingModel[] = [
    new SavingModel({ savingId: 1, name: 'Motorcycle Saving', currentBalance: 1000000, monthlyAmount: 20000, interestRate: 6, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 2, name: 'Car Saving', currentBalance: 1000000, monthlyAmount: 20000, interestRate: 5, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 3, name: 'Christmas Saving', currentBalance: 900000, monthlyAmount: 10000, interestRate: 4, deadline: new Date('2026-01-12') }),
    new SavingModel({ savingId: 4, name: 'Marchamo', currentBalance: 900000, monthlyAmount: 10000, interestRate: 4, deadline: new Date('2026-01-12') }),
];

export function useSaving() {
    const [savings, setSavings] = useState<SavingModel[]>(mockData);

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCuota, setSelectedCuota] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [savingToDelete, setSavingToDelete] = useState<number | null>(null);

    const handleEditClick = (savingId: number, cuota: number) => {
        setSelectedCuota(cuota);
        setShowEditModal(true);
    };

    const handleSaveCuota = (newCuota: number) => {
        setShowEditModal(false);
        // Actualizar en el arreglo
        setSavings((prev) =>
            prev.map((s) =>
                s.savingId === savingToDelete ? new SavingModel({ ...s, monthlyAmount: newCuota }) : s
            )
        );
    };

    const handleDeleteClick = (id: number) => {
        setSavingToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (savingToDelete !== null) {
            setSavings((prev) => prev.filter((s) => s.savingId !== savingToDelete));
        }
        setShowDeleteModal(false);
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
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
