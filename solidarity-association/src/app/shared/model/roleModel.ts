export class RoleModel {

    constructor(init?: Partial<Pick<RoleModel, keyof RoleModel>>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    roleId?: number;
    name?: string;
    description?: string;
}
