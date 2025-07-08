import { AssociateModel } from '@/app/shared/model/associateModel';

export async function createAssociate(associate: AssociateModel) {
    const response = await fetch('/api/associates/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(associate),
    });

    if (!response.ok) throw new Error('Error creating associate');
    return await response.json();
}

export async function updateAssociate(associate: AssociateModel) {
    const response = await fetch(`/api/associates/${associate.associateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(associate),
    });

    if (!response.ok) throw new Error('Error updating associate');
    return await response.json();
}

export async function deleteAssociate(associateId: number) {
    const response = await fetch(`/api/associates/${associateId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error deleting associate');
    return await response.json();
}
