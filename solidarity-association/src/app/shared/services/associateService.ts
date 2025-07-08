import { AssociateModel } from '@/app/shared/model/associateModel';

export async function getAssociates(): Promise<AssociateModel[]> {
    const response = await fetch('/api/associates', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error fetching associates');
    const data = await response.json();
    return data.map((item: any) => new AssociateModel(item));
}

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
