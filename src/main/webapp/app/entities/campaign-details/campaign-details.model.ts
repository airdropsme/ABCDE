import { BaseEntity } from './../../shared';

export class CampaignDetails implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public status?: string,
        public campaignType?: string,
        public campaignPageUrl?: string,
        public prizeValue?: number,
        public terms?: string,
        public startdate?: any,
        public enddate?: any,
        public airdropDetails?: BaseEntity,
        public registeredUser?: BaseEntity,
        public campaignanAlaytics?: BaseEntity[],
        public campaignParticipants?: BaseEntity[],
        public socialmediaDetails?: BaseEntity[],
        public campaignWinners?: BaseEntity[],
        public emailProviders?: BaseEntity[],
        public campaignRewards?: BaseEntity[],
    ) {
    }
}
