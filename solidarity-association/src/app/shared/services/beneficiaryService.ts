import { BeneficiaryModel } from '@/app/shared/model/beneficiaryModel';

export async function getBeneficiaries(): Promise<BeneficiaryModel[]> {
    const response = await fetch('/api/beneficiaries', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener los beneficiarios');
    const data = await response.json();
    return data.map((item: any) => new BeneficiaryModel(item));
}

export async function createBeneficiary(beneficiary: BeneficiaryModel) {
    const response = await fetch('/api/beneficiaries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(beneficiary),
    });

    if (!response.ok) throw new Error('Error al crear el beneficiario');
    return await response.json();
}

export async function updateBeneficiary(beneficiary: BeneficiaryModel) {
    const response = await fetch(`/api/beneficiaries/${beneficiary.beneficiaryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(beneficiary),
    });

    if (!response.ok) throw new Error('Error al actualizar el beneficiario');
    return await response.json();
}

export async function deleteBeneficiary(beneficiaryId: number) {
    const response = await fetch(`/api/beneficiaries/${beneficiaryId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el beneficiario');
    return await response.json();
}
