import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignRewardsComponent } from './campaign-rewards.component';
import { CampaignRewardsDetailComponent } from './campaign-rewards-detail.component';
import { CampaignRewardsPopupComponent } from './campaign-rewards-dialog.component';
import { CampaignRewardsDeletePopupComponent } from './campaign-rewards-delete-dialog.component';

export const campaignRewardsRoute: Routes = [
    {
        path: 'campaign-rewards',
        component: CampaignRewardsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignRewards.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-rewards/:id',
        component: CampaignRewardsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignRewards.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignRewardsPopupRoute: Routes = [
    {
        path: 'campaign-rewards-new',
        component: CampaignRewardsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-rewards/:id/edit',
        component: CampaignRewardsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-rewards/:id/delete',
        component: CampaignRewardsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
