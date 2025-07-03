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
    memberId?: number;
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

export class CreditStatus {

    constructor(init?: Partial<Pick<CreditStatus, keyof CreditStatus>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    statusId?: number;
    description?: string;
}

export class CreditContribution {

    constructor(init?: Partial<Pick<CreditContribution, keyof CreditContribution>>) {
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


