import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AirdropDetailsComponent } from './airdrop-details.component';
import { AirdropDetailsDetailComponent } from './airdrop-details-detail.component';
import { AirdropDetailsPopupComponent } from './airdrop-details-dialog.component';
import { AirdropDetailsDeletePopupComponent } from './airdrop-details-delete-dialog.component';

export const airdropDetailsRoute: Routes = [
    {
        path: 'airdrop-details',
        component: AirdropDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.airdropDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'airdrop-details/:id',
        component: AirdropDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.airdropDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airdropDetailsPopupRoute: Routes = [
    {
        path: 'airdrop-details-new',
        component: AirdropDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.airdropDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airdrop-details/:id/edit',
        component: AirdropDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.airdropDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airdrop-details/:id/delete',
        component: AirdropDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.airdropDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
