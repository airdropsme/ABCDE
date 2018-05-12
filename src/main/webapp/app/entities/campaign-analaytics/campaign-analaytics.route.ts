import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignAnalayticsComponent } from './campaign-analaytics.component';
import { CampaignAnalayticsDetailComponent } from './campaign-analaytics-detail.component';
import { CampaignAnalayticsPopupComponent } from './campaign-analaytics-dialog.component';
import { CampaignAnalayticsDeletePopupComponent } from './campaign-analaytics-delete-dialog.component';

export const campaignAnalayticsRoute: Routes = [
    {
        path: 'campaign-analaytics',
        component: CampaignAnalayticsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignAnalaytics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-analaytics/:id',
        component: CampaignAnalayticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignAnalaytics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignAnalayticsPopupRoute: Routes = [
    {
        path: 'campaign-analaytics-new',
        component: CampaignAnalayticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignAnalaytics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-analaytics/:id/edit',
        component: CampaignAnalayticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignAnalaytics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-analaytics/:id/delete',
        component: CampaignAnalayticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.campaignAnalaytics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
