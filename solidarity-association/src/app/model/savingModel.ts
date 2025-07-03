export class SavingModel {

    constructor(init?: Partial<Pick<SavingModel, keyof SavingModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    savingId?: number;
    associateId?: number;
    savingTypeId?: number;
    name?: string;
    currentBalance?: number;
    monthlyAmount?: number;
    generatedInterest?: number;
    interestRate?: number;
    deadline?: Date;
}

export class SavingTypeModel {

    constructor(init?: Partial<Pick<SavingTypeModel, keyof SavingTypeModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    savingTypeId?: number;
    name?: string;
    description?: string;
}

export class SavingContributionModel {

    constructor(init?: Partial<Pick<SavingContributionModel, keyof SavingContributionModel>>) {
        if (init) {
            if (typeof init.date === 'string') {
                init.date = new Date(init.date);
            }
            Object.assign(this, init);
        }
    }

    contributionId?: number;
    savingId?: number;
    amount?: number;
    date?: Date;
}


export class WithdrawalModel {

    constructor(init?: Partial<Pick<WithdrawalModel, keyof WithdrawalModel>>) {
        if (init) {
            if (typeof init.date === 'string') {
                init.date = new Date(init.date);
            }
            Object.assign(this, init);
        }
    }

    withdrawalId?: number;
    savingId?: number;
    amount?: number;
    date?: Date;
}

