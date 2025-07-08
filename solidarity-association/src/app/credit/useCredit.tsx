'use client';

import { useState } from 'react';
import { CreditModel } from '@/app/model/creditModel';
import { createCredit, deleteCredit, updateCredit } from '@/app/services/creditService';

const mockData: CreditModel[] = [
    new CreditModel({ creditId: 1, name: 'Préstamo Moto', requestedAmount: 1000000, currentBalance: 5000000, monthlyPayment: 50000, interestRate: 19, termMonths: 15 }),
    new CreditModel({ creditId: 2, name: 'Préstamo Carro', requestedAmount: 1000000, currentBalance: 5000000, monthlyPayment: 50000, interestRate: 19, termMonths: 15 }),
    new CreditModel({ creditId: 3, name: 'Préstamo Navideño', requestedAmount: 900000, currentBalance: 5000000, monthlyPayment: 50000, interestRate: 19, termMonths: 15 }),
    new CreditModel({ creditId: 4, name: 'Préstamo Marchamo', requestedAmount: 900000, currentBalance: 5000000, monthlyPayment: 50000, interestRate: 19, termMonths: 15 }),
];

export function useCredit() {
    const [credits, setCredits] = useState<CreditModel[]>(mockData);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [creditToAction, setCreditToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ cuota: number; termmonths: number; interest: number; requested: number }>({
        cuota: 0,
        termmonths: 0,
        interest: 0,
        requested: 0,
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (creditId: number, cuota: number, term: number, interest: number, requested: number) => {
        setSelectedEdit({ cuota, termmonths: term, interest, requested });
        setCreditToAction(creditId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setCreditToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (creditToAction !== null) {
            await deleteCredit(creditToAction);
            setCredits((prev) => prev.filter((c) => c.creditId !== creditToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (cuota: number, termMonths: number, interest: number, requested: number) => {
        
        setShowEditModal(false);

        if (creditToAction !== null) {
            const credit = credits.find((c) => c.creditId === creditToAction);
            if (credit) {
                const updated = new CreditModel({
                    ...credit,
                    monthlyPayment: cuota,
                    termMonths: termMonths,
                    interestRate: interest,
                    requestedAmount: requested,
                });
                await updateCredit(updated);
                setCredits((prev) =>
                    prev.map((c) => c.creditId === updated.creditId ? updated : c)
                );
            }
        }
    };

    const handleCreateCredit = async (newData: {
        description: string;
        installment: number;
        term: number;
        interest: number;
        requested: number;
        balance: number;
    }) => {
        const newCredit = new CreditModel({
            name: newData.description,
            monthlyPayment: newData.installment,
            termMonths: newData.term,
            interestRate: newData.interest,
            requestedAmount: newData.requested,
            currentBalance: newData.balance,
        });
    
        const saved = await createCredit(newCredit);
        setCredits((prev) => [...prev, new CreditModel(saved)]);
        setShowCreateModal(false);
    };

    return {
        credits,
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
