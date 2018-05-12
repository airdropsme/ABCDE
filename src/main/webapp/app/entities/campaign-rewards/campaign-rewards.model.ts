import { BaseEntity } from './../../shared';

export class CampaignRewards implements BaseEntity {
    constructor(
        public id?: number,
        public rewardType?: string,
        public rewardTotal?: number,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
