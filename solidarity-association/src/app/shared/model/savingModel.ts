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
            this.savingTypeId = init.SAVING_TYPE_ID;
            this.name = init.NAME;
            this.description = init.DESCRIPTION;
        }
    }

    savingTypeId?: number;
    name?: string;
    description?: string;
}

export class SavingContributionModel {

    constructor(init?: any) {
        if (init) {
            this.contributionId = init.CONTRIBUTION_ID;
            this.savingId = init.SAVING_ID;
            this.amount = init.AMOUNT;
            this.date = init.DATE ? new Date(init.DATE) : undefined;
        }
    }

    contributionId?: number;
    savingId?: number;
    amount?: number;
    date?: Date;
}


export class WithdrawalModel {

    constructor(init?: any) {
        if (init) {
            this.withdrawalId = init.WITHDRAWAL_ID;
            this.savingId = init.SAVING_ID;
            this.amount = init.AMOUNT;
            this.date = init.DATE ? new Date(init.DATE) : undefined;
        }
    }

    withdrawalId?: number;
    savingId?: number;
    amount?: number;
    date?: Date;
}

