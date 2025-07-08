export class BeneficiaryModel {

    constructor(init?: Partial<Pick<BeneficiaryModel, keyof BeneficiaryModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    beneficiaryId?: number;
    associateId?: number;
    email?: string;
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    nationalId?: string;
    gender?: string;
    relationship?: string;
    percentage?: number;
    province?: string;
    canton?: string;
    district?: string;
    phone?: string;
}
