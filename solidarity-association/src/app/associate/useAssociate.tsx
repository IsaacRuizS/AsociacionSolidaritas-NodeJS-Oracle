'use client';

import { useEffect, useState } from 'react';
import { AssociateModel } from '@/app/shared/model/associateModel';
import { createAssociate, updateAssociate, deleteAssociate, getAssociates } from '@/app/shared/services/associateService';

export function useAssociate() {

    const [associates, setAssociates] = useState<AssociateModel[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAssociate, setSelectedAssociate] = useState<AssociateModel | null>(null);
    const [associateToDelete, setAssociateToDelete] = useState<number | null>(null);

    useEffect(() => {

        const fetchAssociates = async () => {
        
            try {
        
                const data = await getAssociates();
                setAssociates(data);
        
            } catch (err: any) {
                console.error(err);
            } 
        };
        fetchAssociates();
    }, []);

    const handleCreateAssociate = async (data: AssociateModel) => {
        const created = await createAssociate(data);
        setAssociates((prev) => [...prev, new AssociateModel(created)]);
        setShowCreateModal(false);
        
        const newData = await getAssociates();
        setAssociates(newData);
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
        
        const newData = await getAssociates();
        setAssociates(newData);
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
