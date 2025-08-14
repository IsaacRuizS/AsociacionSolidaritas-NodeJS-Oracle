import { WithdrawalModel } from '@/app/shared/model/savingModel';

export async function getWithdrawals(): Promise<WithdrawalModel[]> {
    const response = await fetch('/api/withdrawal', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los retiros');
    const data = await response.json();
    return data.map((item: any) => new WithdrawalModel(item));
}

export async function createWithdrawal(withdrawal: WithdrawalModel) {
    const response = await fetch('/api/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawal),
    });

    if (!response.ok) throw new Error('Error al crear el retiro');
    return await response.json();
}

export async function updateWithdrawal(withdrawal: WithdrawalModel) {
    const response = await fetch(`/api/withdrawal`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawal),
    });

    if (!response.ok) throw new Error('Error al actualizar el retiro');
    return await response.json();
}

export async function deleteWithdrawal(withdrawalId: number) {
    const response = await fetch(`/api/withdrawal`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId })
    });

    if (!response.ok) throw new Error('Error al eliminar el retiro');
    return await response.json();
}
