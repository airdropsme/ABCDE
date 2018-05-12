import { BaseEntity } from './../../shared';

export class RegisteredUser implements BaseEntity {
    constructor(
        public id?: number,
        public joinDate?: any,
        public accountPlan?: string,
        public email?: string,
        public emailVerified?: boolean,
    ) {
        this.emailVerified = false;
    }
}
