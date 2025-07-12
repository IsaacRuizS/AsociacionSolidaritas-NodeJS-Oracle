export class SavingModel {

    constructor(init?: any) {
        if (init) {
            this.savingId = init.SAVING_ID;
            this.associateId = init.ASSOCIATE_ID;
            this.savingTypeId = init.SAVING_TYPE_ID;
            this.name = init.NAME;
            this.currentBalance = init.CURRENT_BALANCE;
            this.monthlyAmount = init.MONTHLY_AMOUNT;
            this.generatedInterest = init.GENERATED_INTEREST;
            this.interestRate = init.INTEREST_RATE;
            this.deadline = init.DEADLINE;
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

    constructor(init?: any) {
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

