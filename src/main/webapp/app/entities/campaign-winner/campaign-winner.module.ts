import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    CampaignWinnerService,
    CampaignWinnerPopupService,
    CampaignWinnerComponent,
    CampaignWinnerDetailComponent,
    CampaignWinnerDialogComponent,
    CampaignWinnerPopupComponent,
    CampaignWinnerDeletePopupComponent,
    CampaignWinnerDeleteDialogComponent,
    campaignWinnerRoute,
    campaignWinnerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignWinnerRoute,
    ...campaignWinnerPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignWinnerComponent,
        CampaignWinnerDetailComponent,
        CampaignWinnerDialogComponent,
        CampaignWinnerDeleteDialogComponent,
        CampaignWinnerPopupComponent,
        CampaignWinnerDeletePopupComponent,
    ],
    entryComponents: [
        CampaignWinnerComponent,
        CampaignWinnerDialogComponent,
        CampaignWinnerPopupComponent,
        CampaignWinnerDeleteDialogComponent,
        CampaignWinnerDeletePopupComponent,
    ],
    providers: [
        CampaignWinnerService,
        CampaignWinnerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeCampaignWinnerModule {}
