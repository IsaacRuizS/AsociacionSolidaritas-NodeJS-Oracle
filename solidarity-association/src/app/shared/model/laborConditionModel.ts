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
