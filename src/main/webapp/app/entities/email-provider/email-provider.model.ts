import { BaseEntity } from './../../shared';

export class EmailProvider implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public connected?: string,
        public apiKey?: string,
        public campaignDetails?: BaseEntity,
    ) {
    }
}
