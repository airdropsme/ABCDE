import { BaseEntity } from './../../shared';

export class SocialmediaDetails implements BaseEntity {
    constructor(
        public id?: number,
        public facebook?: string,
        public twitter?: string,
        public pinterest?: string,
        public youtube?: string,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
