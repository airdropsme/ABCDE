import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    CampaignParticipantService,
    CampaignParticipantPopupService,
    CampaignParticipantComponent,
    CampaignParticipantDetailComponent,
    CampaignParticipantDialogComponent,
    CampaignParticipantPopupComponent,
    CampaignParticipantDeletePopupComponent,
    CampaignParticipantDeleteDialogComponent,
    campaignParticipantRoute,
    campaignParticipantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignParticipantRoute,
    ...campaignParticipantPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignParticipantComponent,
        CampaignParticipantDetailComponent,
        CampaignParticipantDialogComponent,
        CampaignParticipantDeleteDialogComponent,
        CampaignParticipantPopupComponent,
        CampaignParticipantDeletePopupComponent,
    ],
    entryComponents: [
        CampaignParticipantComponent,
        CampaignParticipantDialogComponent,
        CampaignParticipantPopupComponent,
        CampaignParticipantDeleteDialogComponent,
        CampaignParticipantDeletePopupComponent,
    ],
    providers: [
        CampaignParticipantService,
        CampaignParticipantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeCampaignParticipantModule {}
