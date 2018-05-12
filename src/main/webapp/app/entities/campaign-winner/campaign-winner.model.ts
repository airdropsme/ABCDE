import { BaseEntity } from './../../shared';

export class CampaignWinner implements BaseEntity {
    constructor(
        public id?: number,
        public winnerId?: string,
        public winnerPrize?: string,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
