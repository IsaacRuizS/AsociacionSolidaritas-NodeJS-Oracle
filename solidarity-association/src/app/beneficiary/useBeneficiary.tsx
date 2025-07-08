'use client';

import { useState } from 'react';
import { BeneficiaryModel } from '@/app/shared/model/beneficiaryModel';
import {createBeneficiary,updateBeneficiary,deleteBeneficiary } from '@/app/shared/services/beneficiaryService';    

const mockData: BeneficiaryModel[] = [
    new BeneficiaryModel({
        beneficiaryId: 1,
        nationalId: '3-3333-3333',
        firstName: 'Carlos',
        lastName1: 'Gómez',
        lastName2: 'Rodríguez',
        phone: '8888-1234',
        relationship: 'Hijo',
        percentage: 50,
    }),
    new BeneficiaryModel({
        beneficiaryId: 2,
        nationalId: '4-4444-4444',
        firstName: 'María',
        lastName1: 'Fernández',
        lastName2: 'Jiménez',
        phone: '8999-5678',
        relationship: 'Esposa',
        percentage: 50,
    }),
];

export function useBeneficiary() {
    const [beneficiaries, setBeneficiaries] = useState<BeneficiaryModel[]>(mockData);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryModel | null>(null);
    const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<number | null>(null);

    const handleCreateBeneficiary = async (data: BeneficiaryModel) => {
        const created = await createBeneficiary(data);
        setBeneficiaries((prev) => [...prev, new BeneficiaryModel(created)]);
        setShowCreateModal(false);
    };

    const handleEditClick = (beneficiaryId: number) => {
        const found = beneficiaries.find((b) => b.beneficiaryId === beneficiaryId);
        if (found) {
            setSelectedBeneficiary(found);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = async (updatedData: BeneficiaryModel) => {
        const updated = await updateBeneficiary(updatedData);
        setBeneficiaries((prev) =>
            prev.map((b) =>
                b.beneficiaryId === updated.beneficiaryId ? new BeneficiaryModel(updated) : b
            )
        );
        setShowEditModal(false);
    };

    const handleDeleteClick = (beneficiaryId: number) => {
        setBeneficiaryToDelete(beneficiaryId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (beneficiaryToDelete !== null) {
            await deleteBeneficiary(beneficiaryToDelete);
            setBeneficiaries((prev) => prev.filter((b) => b.beneficiaryId !== beneficiaryToDelete));
            setBeneficiaryToDelete(null);
        }
        setShowDeleteModal(false);
    };

    return {
        beneficiaries,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedBeneficiary,
        handleEditClick,
        handleSaveEdit,
        handleCreateBeneficiary,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
