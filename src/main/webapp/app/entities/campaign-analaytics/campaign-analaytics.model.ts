import { BaseEntity } from './../../shared';

export class CampaignAnalaytics implements BaseEntity {
    constructor(
        public id?: number,
        public views?: number,
        public referralCount?: number,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
