export class LaborConditionModel {

    constructor(init?: any) {
        if (init) {
            this.conditionId = init.CONDITION_ID;
            this.description = init.DESCRIPTION;
        }
    }

    conditionId?: number;
    description?: string;
}

export class CreditModel {

    constructor(init?: any) {
        if (init) {
            this.creditId = init.CREDIT_ID;
            this.associateId = init.ASSOCIATE_ID;
            this.creditStatusId = init.CREDIT_STATUS_ID;
            this.name = init.NAME;
            this.requestedAmount = init.REQUESTED_AMOUNT;
            this.termMonths = init.TERM_MONTHS;
            this.currentBalance = init.CURRENT_BALANCE;
            this.monthlyPayment = init.MONTHLY_PAYMENT;
            this.interestRate = init.INTEREST_RATE;
            this.requestDate = typeof init.REQUEST_DATE === 'string' ? new Date(init.REQUEST_DATE) : init.REQUEST_DATE;
            this.approvalDate = typeof init.APPROVAL_DATE === 'string' ? new Date(init.APPROVAL_DATE) : init.APPROVAL_DATE;
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

    constructor(init?: any) {
        if (init) {
            this.statusId = init.STATUS_ID;
            this.description = init.DESCRIPTION;
        }
    }

    statusId?: number;
    description?: string;
}

export class CreditContributionModel {

    constructor(init?: any) {
        if (init) {
            this.contributionId = init.CONTRIBUTION_ID;
            this.creditId = init.CREDIT_ID;
            this.amount = init.AMOUNT;
            this.date = typeof init.DATE === 'string' ? new Date(init.DATE) : init.DATE;
        }
    }

    contributionId?: number;
    creditId?: number;
    amount?: number;
    date?: Date;
}