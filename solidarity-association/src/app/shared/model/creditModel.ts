export class CreditModel {

    constructor(init?: Partial<Pick<CreditModel, keyof CreditModel>>) {
        if (init) {
            if (typeof init.requestDate === 'string') {
                init.requestDate = new Date(init.requestDate);
            }
            if (typeof init.approvalDate === 'string') {
                init.approvalDate = new Date(init.approvalDate);
            }
            Object.assign(this, init);
        }
    }

    creditId?: number;
    associateId?: number;
    creditStatusId?: number;
    name?: string;
    requestedAmount?: number;
    termMonths?: number;
    currentBalance?: number;
    monthlyPayment?: number;
    interestRate?: number;
    requestDate?: Date;
    approvalDate?: Date;
}

export class CreditStatusModel {

    constructor(init?: Partial<Pick<CreditStatusModel, keyof CreditStatusModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    statusId?: number;
    description?: string;
}

export class CreditContributionModel {

    constructor(init?: Partial<Pick<CreditContributionModel, keyof CreditContributionModel>>) {
        if (init) {
            if (typeof init.date === 'string') {
                init.date = new Date(init.date);
            }
            Object.assign(this, init);
        }
    }

    contributionId?: number;
    creditId?: number;
    amount?: number;
    date?: Date;
}


