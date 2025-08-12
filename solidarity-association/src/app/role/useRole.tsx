'use client';

import { useEffect, useState } from 'react';
import { RoleModel } from '@/app/shared/model/roleModel';
import { createRole, updateRole, deleteRole, getRoles } from '@/app/shared/services/roleService';

export function useRole() {

    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [roleToAction, setRoleToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<RoleModel | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Cargar roles desde API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchRoles();
    }, []);

    // Abrir modal de edición
    const handleEditClick = (roleId: number) => {
        const role = roles.find((r) => r.roleId === roleId);
        if (role) {
            setSelectedEdit(role);
            setShowEditModal(true);
        }
    };

    // Abrir modal de eliminación
    const handleDeleteClick = (id: number) => {
        setRoleToAction(id);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (roleToAction !== null) {
            await deleteRole(roleToAction);
            setRoles((prev) => prev.filter((r) => r.roleId !== roleToAction));
        }
        setShowDeleteModal(false);
    };

    // Guardar cambios de edición
    const handleSaveEdit = async (updatedRole: RoleModel) => {
        
        const updated = await updateRole(updatedRole);
        setShowEditModal(false);

        const newData = await getRoles();
        setRoles(newData);
    };

    // Crear nuevo rol
    const handleCreateRole = async (newRole: RoleModel) => {
        
        const saved = await createRole(newRole);
        setShowCreateModal(false);

        const newData = await getRoles();
        setRoles(newData);
    };

    return {
        roles,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        selectedEdit,
        handleEditClick,
        handleSaveEdit,
        handleCreateRole,
        showDeleteModal,
        setShowDeleteModal,
        handleDeleteClick,
        handleConfirmDelete,
    };
}
