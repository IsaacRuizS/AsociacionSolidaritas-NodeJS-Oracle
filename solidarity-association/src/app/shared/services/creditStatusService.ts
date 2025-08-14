import { CreditStatusModel } from '@/app/shared/model/creditModel';

export async function getCreditStatuses(): Promise<CreditStatusModel[]> {
    const response = await fetch('/api/creditStatus', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los estados de crédito');
    const data = await response.json();
    return data.map((item: any) => new CreditStatusModel(item));
}

export async function createCreditStatus(status: CreditStatusModel) {
    const response = await fetch('/api/creditStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status),
    });

    if (!response.ok) throw new Error('Error al crear el estado de crédito');
    return await response.json();
}

export async function updateCreditStatus(status: CreditStatusModel) {
    const response = await fetch(`/api/creditStatus`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status),
    });

    if (!response.ok) throw new Error('Error al actualizar el estado de crédito');
    return await response.json();
}

export async function deleteCreditStatus(statusId: number) {
    const response = await fetch(`/api/creditStatus`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusId })
    });

    if (!response.ok) throw new Error('Error al eliminar el estado de crédito');
    return await response.json();
}