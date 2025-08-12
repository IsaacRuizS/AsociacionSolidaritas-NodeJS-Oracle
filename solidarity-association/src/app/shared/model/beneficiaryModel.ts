export class BeneficiaryModel {

    constructor(init?: any) {
        if (init) {
            this.beneficiaryId = init.BENEFICIARY_ID;
            this.associateId = init.ASSOCIATE_ID;
            this.email = init.EMAIL;
            this.firstName = init.FIRST_NAME;
            this.lastName1 = init.LAST_NAME1;
            this.lastName2 = init.LAST_NAME2;
            this.nationalId = init.NATIONAL_ID;
            this.gender = init.GENDER;
            this.relationship = init.RELATIONSHIP;
            this.percentage = init.PERCENTAGE;
            this.province = init.PROVINCE;
            this.canton = init.CANTON;
            this.district = init.DISTRICT;
            this.phone = init.PHONE;
        }
    }

    beneficiaryId?: number;
    associateId?: number;
    email?: string;
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    nationalId?: string;
    gender?: string;
    relationship?: string;
    percentage?: number;
    province?: string;
    canton?: string;
    district?: string;
    phone?: string;
}
