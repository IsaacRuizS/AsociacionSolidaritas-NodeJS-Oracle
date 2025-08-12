'use client';

import { useEffect, useState } from 'react';
import { BeneficiaryModel } from '@/app/shared/model/beneficiaryModel';
import {createBeneficiary,updateBeneficiary,deleteBeneficiary, getBeneficiaries } from '@/app/shared/services/beneficiaryService';    
import { AssociateModel } from '../shared/model/associateModel';
import { getAssociates } from '../shared/services/associateService';

export function useBeneficiary() {

    const [beneficiaries, setBeneficiaries] = useState<BeneficiaryModel[]>([]);
    const [associates, setAssociates] = useState<AssociateModel[]>([]);// para la relacion de asociado-beneficiario
    

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryModel | null>(null);
    const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<number | null>(null);

    useEffect(() => {
    
        const fetchBeneficiaries = async () => {
        
            try {
        
                const data = await getBeneficiaries();
                setBeneficiaries(data);

                const associates = await getAssociates();
                setAssociates(associates);

            } catch (err: any) {
                console.error(err);
            } 
        };

        fetchBeneficiaries();
    }, []);

    const handleCreateBeneficiary = async (data: BeneficiaryModel) => {
        const created = await createBeneficiary(data);
        setBeneficiaries((prev) => [...prev, new BeneficiaryModel(created)]);
        setShowCreateModal(false);

        const newData = await getBeneficiaries();
        setBeneficiaries(newData);
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

        const newData = await getBeneficiaries();
        setBeneficiaries(newData);
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
        associates,
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
