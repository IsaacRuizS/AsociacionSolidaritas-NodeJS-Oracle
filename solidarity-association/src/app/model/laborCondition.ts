export class LaborConditionModel {

    constructor(init?: Partial<Pick<LaborConditionModel, keyof LaborConditionModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    conditionId?: number;
    description?: string;
}
