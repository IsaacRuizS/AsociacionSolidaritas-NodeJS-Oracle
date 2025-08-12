import { LaborConditionModel } from '@/app/shared/model/laborConditionModel';

export async function getLaborConditions(): Promise<LaborConditionModel[]> {
    const response = await fetch('/api/laborCondition', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener las condiciones laborales');
    const data = await response.json();
    return data.map((item: any) => new LaborConditionModel(item));
}

export async function createLaborCondition(condition: LaborConditionModel) {
    const response = await fetch('/api/laborCondition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(condition),
    });

    if (!response.ok) throw new Error('Error al crear la condición laboral');
    return await response.json();
}

export async function updateLaborCondition(condition: LaborConditionModel) {
    const response = await fetch(`/api/laborCondition`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(condition),
    });

    if (!response.ok) throw new Error('Error al actualizar la condición laboral');
    return await response.json();
}

export async function deleteLaborCondition(conditionId: number) {
    const response = await fetch(`/api/laborCondition/${conditionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar la condición laboral');
    return await response.json();
}
