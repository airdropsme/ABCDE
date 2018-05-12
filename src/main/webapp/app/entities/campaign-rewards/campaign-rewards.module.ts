import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    CampaignRewardsService,
    CampaignRewardsPopupService,
    CampaignRewardsComponent,
    CampaignRewardsDetailComponent,
    CampaignRewardsDialogComponent,
    CampaignRewardsPopupComponent,
    CampaignRewardsDeletePopupComponent,
    CampaignRewardsDeleteDialogComponent,
    campaignRewardsRoute,
    campaignRewardsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignRewardsRoute,
    ...campaignRewardsPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignRewardsComponent,
        CampaignRewardsDetailComponent,
        CampaignRewardsDialogComponent,
        CampaignRewardsDeleteDialogComponent,
        CampaignRewardsPopupComponent,
        CampaignRewardsDeletePopupComponent,
    ],
    entryComponents: [
        CampaignRewardsComponent,
        CampaignRewardsDialogComponent,
        CampaignRewardsPopupComponent,
        CampaignRewardsDeleteDialogComponent,
        CampaignRewardsDeletePopupComponent,
    ],
    providers: [
        CampaignRewardsService,
        CampaignRewardsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeCampaignRewardsModule {}
