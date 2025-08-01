import { WithdrawalModel } from '@/app/shared/model/savingModel';

export async function getWithdrawals(): Promise<WithdrawalModel[]> {
    const response = await fetch('/api/withdrawals', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los retiros');
    const data = await response.json();
    return data.map((item: any) => new WithdrawalModel(item));
}

export async function createWithdrawal(withdrawal: WithdrawalModel) {
    const response = await fetch('/api/withdrawals/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawal),
    });

    if (!response.ok) throw new Error('Error al crear el retiro');
    return await response.json();
}

export async function updateWithdrawal(withdrawal: WithdrawalModel) {
    const response = await fetch(`/api/withdrawals/${withdrawal.withdrawalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawal),
    });

    if (!response.ok) throw new Error('Error al actualizar el retiro');
    return await response.json();
}

export async function deleteWithdrawal(withdrawalId: number) {
    const response = await fetch(`/api/withdrawals/${withdrawalId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el retiro');
    return await response.json();
}
