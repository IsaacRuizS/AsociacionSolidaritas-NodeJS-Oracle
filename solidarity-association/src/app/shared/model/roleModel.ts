export class RoleModel {

    constructor(init?: any) {
        if (init) {
            this.roleId = init.ROLE_ID;
            this.name = init.NAME;
            this.description = init.DESCRIPTION;
        }
    }

    roleId?: number;
    name?: string;
    description?: string;
}
