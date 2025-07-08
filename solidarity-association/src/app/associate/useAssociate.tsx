'use client';

import { useState } from 'react';
import { AssociateModel } from '@/app/shared/model/associateModel';
import { createAssociate, updateAssociate, deleteAssociate } from '@/app/shared/services/associateService';

const mockData: AssociateModel[] = [
    new AssociateModel({
        associateId: 1,
        nationalId: '1-1111-1111',
        firstName: 'Juan',
        lastName1: 'Pérez',
        lastName2: 'Soto',
        email: 'juan@example.com',
        phone: '8888-8888',
        entryDate: new Date('2021-06-01'),
        grossSalary: 750000,
    }),
    new AssociateModel({
        associateId: 2,
        nationalId: '2-2222-2222',
        firstName: 'Ana',
        lastName1: 'Ramírez',
        lastName2: 'Lopez',
        email: 'ana@example.com',
        phone: '8999-9999',
        entryDate: new Date('2022-01-15'),
        grossSalary: 680000,
    }),
];

export function useAssociate() {
    const [associates, setAssociates] = useState<AssociateModel[]>(mockData);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAssociate, setSelectedAssociate] = useState<AssociateModel | null>(null);
    const [associateToDelete, setAssociateToDelete] = useState<number | null>(null);

    const handleCreateAssociate = async (data: AssociateModel) => {
        const created = await createAssociate(data);
        setAssociates((prev) => [...prev, new AssociateModel(created)]);
        setShowCreateModal(false);
    };

    const handleEditClick = (associateId: number) => {
        const found = associates.find((a) => a.associateId === associateId);
        if (found) {
            setSelectedAssociate(found);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = async (updatedData: AssociateModel) => {
        const updated = await updateAssociate(updatedData);
        setAssociates((prev) =>
            prev.map((a) => (a.associateId === updated.associateId ? new AssociateModel(updated) : a))
        );
        setShowEditModal(false);
    };

    const handleDeleteClick = (associateId: number) => {
        setAssociateToDelete(associateId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (associateToDelete !== null) {
            await deleteAssociate(associateToDelete);
            setAssociates((prev) => prev.filter((a) => a.associateId !== associateToDelete));
            setAssociateToDelete(null);
        }
        setShowDeleteModal(false);
    };

    return {
        associates,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedAssociate,
        handleEditClick,
        handleSaveEdit,
        handleCreateAssociate,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
