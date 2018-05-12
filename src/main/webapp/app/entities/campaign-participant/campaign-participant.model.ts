import { BaseEntity } from './../../shared';

export class CampaignParticipant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public uniqueURL?: string,
        public points?: number,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
