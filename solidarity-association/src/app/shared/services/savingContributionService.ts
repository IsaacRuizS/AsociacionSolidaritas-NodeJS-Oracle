import { SavingContributionModel } from '@/app/shared/model/savingModel';

export async function getSavingContributions(): Promise<SavingContributionModel[]> {
    const response = await fetch('/api/saving-contributions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los aportes');
    const data = await response.json();
    return data.map((item: any) => new SavingContributionModel(item));
}

export async function createSavingContribution(contribution: SavingContributionModel) {
    const response = await fetch('/api/saving-contributions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contribution),
    });

    if (!response.ok) throw new Error('Error al crear el aporte');
    return await response.json();
}

export async function updateSavingContribution(contribution: SavingContributionModel) {
    const response = await fetch(`/api/saving-contributions/${contribution.contributionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contribution),
    });

    if (!response.ok) throw new Error('Error al actualizar el aporte');
    return await response.json();
}

export async function deleteSavingContribution(contributionId: number) {
    const response = await fetch(`/api/saving-contributions/${contributionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el aporte');
    return await response.json();
}
