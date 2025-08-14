import { SavingTypeModel } from '@/app/shared/model/savingModel';

export async function getSavingTypes(): Promise<SavingTypeModel[]> {
    const response = await fetch('/api/savingType', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los tipos de ahorro');
    const data = await response.json();
    return data.map((item: any) => new SavingTypeModel(item));
}

export async function createSavingType(type: SavingTypeModel) {
    const response = await fetch('/api/savingType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(type),
    });

    if (!response.ok) throw new Error('Error al crear el tipo de ahorro');
    return await response.json();
}

export async function updateSavingType(type: SavingTypeModel) {
    const response = await fetch(`/api/savingType`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(type),
    });

    if (!response.ok) throw new Error('Error al actualizar el tipo de ahorro');
    return await response.json();
}

export async function deleteSavingType(typeId: number) {
    const response = await fetch(`/api/savingType`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeId })
    });

    if (!response.ok) throw new Error('Error al eliminar el tipo de ahorro');
    return await response.json();
}