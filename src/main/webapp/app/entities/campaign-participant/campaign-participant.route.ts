import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignParticipantComponent } from './campaign-participant.component';
import { CampaignParticipantDetailComponent } from './campaign-participant-detail.component';
import { CampaignParticipantPopupComponent } from './campaign-participant-dialog.component';
import { CampaignParticipantDeletePopupComponent } from './campaign-participant-delete-dialog.component';

export const campaignParticipantRoute: Routes = [
    {
        path: 'campaign-participant',
        component: CampaignParticipantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignParticipant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-participant/:id',
        component: CampaignParticipantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignParticipant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignParticipantPopupRoute: Routes = [
    {
        path: 'campaign-participant-new',
        component: CampaignParticipantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignParticipant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-participant/:id/edit',
        component: CampaignParticipantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignParticipant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-participant/:id/delete',
        component: CampaignParticipantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignParticipant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
