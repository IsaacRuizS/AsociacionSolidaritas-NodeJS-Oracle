import { CreditModel } from '@/app/shared/model/creditModel';

export async function getCredits(): Promise<CreditModel[]> {
    const response = await fetch('/api/credits', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los créditos');
    const data = await response.json();
    return data.map((item: any) => new CreditModel(item));
}

export async function createCredit(credit: CreditModel) {
    const response = await fetch('/api/credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credit),
    });

    if (!response.ok) throw new Error('Error al crear el crédito');
    return await response.json();
}

export async function updateCredit(credit: CreditModel) {
    const response = await fetch(`/api/credit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credit),
    });

    if (!response.ok) throw new Error('Error al actualizar el crédito');
    return await response.json();
}

export async function deleteCredit(creditId: number) {
    const response = await fetch(`/api/credit/${creditId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el crédito');
    return await response.json();
}
