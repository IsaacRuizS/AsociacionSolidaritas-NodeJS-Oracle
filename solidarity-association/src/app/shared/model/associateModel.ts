export class AssociateModel {

    constructor(init?: any) {
        if (init) {
            this.associateId = init.ASSOCIATE_ID;
            this.roleId = init.ROLE_ID;
            this.laborConditionId = init.LABORCONDITION_ID;
            this.nationalId = init.NATIONAL_ID;
            this.firstName = init.FIRST_NAME;
            this.lastName1 = init.LAST_NAME_1;
            this.lastName2 = init.LAST_NAME_2;
            this.province = init.PROVINCE;
            this.canton = init.CANTON;
            this.district = init.DISTRICT;
            this.birthDate = init.BIRTH_DATE ? new Date(init.BIRTH_DATE) : undefined;
            this.maritalStatus = init.MARITAL_STATUS;
            this.gender = init.GENDER;
            this.profession = init.PROFESSION;
            this.entryDate = init.ENTRY_DATE ? new Date(init.ENTRY_DATE) : init.ENTRY_DATE;
            this.grossSalary = init.GROSS_SALARY;
            this.company = init.COMPANY;
            this.email = init.EMAIL;
            this.password = init.PASSWORD;
            this.phone = init.PHONE;
        }
    }

    associateId?: number;
    roleId?: number;
    laborConditionId?: number;
    nationalId?: string;
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    province?: string;
    canton?: string;
    district?: string;
    birthDate?: Date;
    maritalStatus?: string;
    gender?: string;
    profession?: string;
    entryDate?: Date;
    grossSalary?: number;
    company?: string;
    email?: string;
    password?: string;
    phone?: string;
}
