import { CreditModel } from '@/app/shared/model/creditModel';

export async function createCredit(credit: CreditModel) {
    const response = await fetch('/api/credits/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credit),
    });

    return await response.json();
}

export async function updateCredit(credit: CreditModel) {
    const response = await fetch(`/api/credits/${credit.creditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credit),
    });

    return await response.json();
}

export async function deleteCredit(creditId: number) {
    const response = await fetch(`/api/credits/${creditId}`, {
        method: 'DELETE',
    });

    return await response.json();
}
