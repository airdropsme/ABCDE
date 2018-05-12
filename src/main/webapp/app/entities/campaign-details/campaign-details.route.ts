import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignDetailsComponent } from './campaign-details.component';
import { CampaignDetailsDetailComponent } from './campaign-details-detail.component';
import { CampaignDetailsPopupComponent } from './campaign-details-dialog.component';
import { CampaignDetailsDeletePopupComponent } from './campaign-details-delete-dialog.component';

export const campaignDetailsRoute: Routes = [
    {
        path: 'campaign-details',
        component: CampaignDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-details/:id',
        component: CampaignDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignDetailsPopupRoute: Routes = [
    {
        path: 'campaign-details-new',
        component: CampaignDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-details/:id/edit',
        component: CampaignDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-details/:id/delete',
        component: CampaignDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
