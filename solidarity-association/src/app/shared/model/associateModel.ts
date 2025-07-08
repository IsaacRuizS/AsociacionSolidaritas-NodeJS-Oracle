export class AssociateModel {

    constructor(init?: Partial<Pick<AssociateModel, keyof AssociateModel>>) {
        if (init) {
            if (typeof init.birthDate === 'string') {
                init.birthDate = new Date(init.birthDate);
            }
            if (typeof init.entryDate === 'string') {
                init.entryDate = new Date(init.entryDate);
            }
            Object.assign(this, init);
        }
    }

    associateId?: number;
    roleId?: number;
    laborConditionId?: number;
    nationalId?: string;
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    province?: string;
    canton?: string;
    district?: string;
    birthDate?: Date;
    maritalStatus?: string;
    gender?: string;
    profession?: string;
    entryDate?: Date;
    grossSalary?: number;
    company?: string;
    email?: string;
    password?: string;
    phone?: string;
}
