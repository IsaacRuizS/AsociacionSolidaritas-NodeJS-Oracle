'use client';

import { useState } from 'react';
import { RoleModel } from '@/app/shared/model/roleModel';
import { createRole, updateRole, deleteRole } from '@/app/shared/services/roleService';

const mockData: RoleModel[] = [
    new RoleModel({ roleId: 1, name: 'Administrador', description: 'Control total del sistema' }),
    new RoleModel({ roleId: 2, name: 'Usuario', description: 'Acceso limitado' }),
];

export function useRole() {
    const [roles, setRoles] = useState<RoleModel[]>(mockData);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [roleToAction, setRoleToAction] = useState<number | null>(null);
    const [selectedEdit, setSelectedEdit] = useState<{ name: string; description: string }>({ name: '', description: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (roleId: number, name: string, description: string) => {
        setSelectedEdit({ name, description });
        setRoleToAction(roleId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setRoleToAction(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (roleToAction !== null) {
            await deleteRole(roleToAction);
            setRoles((prev) => prev.filter((r) => r.roleId !== roleToAction));
        }
        setShowDeleteModal(false);
    };

    const handleSaveEdit = async (name: string, description: string) => {
        setShowEditModal(false);
        if (roleToAction !== null) {
            const role = roles.find((r) => r.roleId === roleToAction);
            if (role) {
                const updated = new RoleModel({ ...role, name, description });
                await updateRole(updated);
                setRoles((prev) => prev.map((r) => r.roleId === updated.roleId ? updated : r));
            }
        }
    };

    const handleCreateRole = async (newData: { name: string; description: string }) => {
        const newRole = new RoleModel({ name: newData.name, description: newData.description });
        const saved = await createRole(newRole);
        setRoles((prev) => [...prev, new RoleModel(saved)]);
        setShowCreateModal(false);
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
