import { RoleModel } from '@/app/shared/model/roleModel';

export async function getRoles(): Promise<RoleModel[]> {
    const response = await fetch('/api/roles', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los roles');
    const data = await response.json();
    return data.map((item: any) => new RoleModel(item));
}

export async function createRole(role: RoleModel) {
    const response = await fetch('/api/roles/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role),
    });

    if (!response.ok) throw new Error('Error al crear el rol');
    return await response.json();
}

export async function updateRole(role: RoleModel) {
    const response = await fetch(`/api/roles/${role.roleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role),
    });

    if (!response.ok) throw new Error('Error al actualizar el rol');
    return await response.json();
}

export async function deleteRole(roleId: number) {
    const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el rol');
    return await response.json();
}
