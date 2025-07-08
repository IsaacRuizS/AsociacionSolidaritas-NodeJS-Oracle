// services/savingService.ts
import { SavingModel } from '@/app/shared/model/savingModel';

export async function createSaving(saving: SavingModel) {
    const response = await fetch('/api/savings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saving),
    });

    return await response.json();
}

export async function updateSaving(saving: SavingModel) {
    const response = await fetch(`/api/savings/${saving.savingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saving),
    });

    return await response.json();
}

export async function deleteSaving(savingId: number) {
    const response = await fetch(`/api/savings/${savingId}`, {
        method: 'DELETE',
    });

    return await response.json();
}
