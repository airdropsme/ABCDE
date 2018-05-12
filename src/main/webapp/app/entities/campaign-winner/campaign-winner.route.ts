import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignWinnerComponent } from './campaign-winner.component';
import { CampaignWinnerDetailComponent } from './campaign-winner-detail.component';
import { CampaignWinnerPopupComponent } from './campaign-winner-dialog.component';
import { CampaignWinnerDeletePopupComponent } from './campaign-winner-delete-dialog.component';

export const campaignWinnerRoute: Routes = [
    {
        path: 'campaign-winner',
        component: CampaignWinnerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignWinner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-winner/:id',
        component: CampaignWinnerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignWinner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignWinnerPopupRoute: Routes = [
    {
        path: 'campaign-winner-new',
        component: CampaignWinnerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignWinner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-winner/:id/edit',
        component: CampaignWinnerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignWinner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-winner/:id/delete',
        component: CampaignWinnerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignWinner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
