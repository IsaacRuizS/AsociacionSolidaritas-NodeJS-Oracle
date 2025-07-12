import { SavingModel } from '@/app/shared/model/savingModel';

export async function getSavings(): Promise<SavingModel[]> {
    const response = await fetch('/api/saving', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los ahorros');
    const data = await response.json();
    return data.map((item: any) => new SavingModel(item));
}

export async function createSaving(saving: SavingModel) {
    const response = await fetch('/api/savings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saving),
    });

    if (!response.ok) throw new Error('Error al crear el ahorro');
    return await response.json();
}

export async function updateSaving(saving: SavingModel) {
    const response = await fetch(`/api/savings/${saving.savingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saving),
    });

    if (!response.ok) throw new Error('Error al actualizar el ahorro');
    return await response.json();
}

export async function deleteSaving(savingId: number) {
    const response = await fetch(`/api/savings/${savingId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el ahorro');
    return await response.json();
}
