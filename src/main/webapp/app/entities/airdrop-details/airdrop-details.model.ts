import { BaseEntity } from './../../shared';

export class AirdropDetails implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public currencyName?: string,
        public currencyType?: string,
        public contractAddress?: string,
    ) {
    }
}
