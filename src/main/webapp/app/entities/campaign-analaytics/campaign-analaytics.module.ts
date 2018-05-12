import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    CampaignAnalayticsService,
    CampaignAnalayticsPopupService,
    CampaignAnalayticsComponent,
    CampaignAnalayticsDetailComponent,
    CampaignAnalayticsDialogComponent,
    CampaignAnalayticsPopupComponent,
    CampaignAnalayticsDeletePopupComponent,
    CampaignAnalayticsDeleteDialogComponent,
    campaignAnalayticsRoute,
    campaignAnalayticsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignAnalayticsRoute,
    ...campaignAnalayticsPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignAnalayticsComponent,
        CampaignAnalayticsDetailComponent,
        CampaignAnalayticsDialogComponent,
        CampaignAnalayticsDeleteDialogComponent,
        CampaignAnalayticsPopupComponent,
        CampaignAnalayticsDeletePopupComponent,
    ],
    entryComponents: [
        CampaignAnalayticsComponent,
        CampaignAnalayticsDialogComponent,
        CampaignAnalayticsPopupComponent,
        CampaignAnalayticsDeleteDialogComponent,
        CampaignAnalayticsDeletePopupComponent,
    ],
    providers: [
        CampaignAnalayticsService,
        CampaignAnalayticsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeCampaignAnalayticsModule {}
