import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    CampaignDetailsService,
    CampaignDetailsPopupService,
    CampaignDetailsComponent,
    CampaignDetailsDetailComponent,
    CampaignDetailsDialogComponent,
    CampaignDetailsPopupComponent,
    CampaignDetailsDeletePopupComponent,
    CampaignDetailsDeleteDialogComponent,
    campaignDetailsRoute,
    campaignDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignDetailsRoute,
    ...campaignDetailsPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignDetailsComponent,
        CampaignDetailsDetailComponent,
        CampaignDetailsDialogComponent,
        CampaignDetailsDeleteDialogComponent,
        CampaignDetailsPopupComponent,
        CampaignDetailsDeletePopupComponent,
    ],
    entryComponents: [
        CampaignDetailsComponent,
        CampaignDetailsDialogComponent,
        CampaignDetailsPopupComponent,
        CampaignDetailsDeleteDialogComponent,
        CampaignDetailsDeletePopupComponent,
    ],
    providers: [
        CampaignDetailsService,
        CampaignDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeCampaignDetailsModule {}
