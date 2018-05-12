import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SocialmediaDetailsComponent } from './socialmedia-details.component';
import { SocialmediaDetailsDetailComponent } from './socialmedia-details-detail.component';
import { SocialmediaDetailsPopupComponent } from './socialmedia-details-dialog.component';
import { SocialmediaDetailsDeletePopupComponent } from './socialmedia-details-delete-dialog.component';

export const socialmediaDetailsRoute: Routes = [
    {
        path: 'socialmedia-details',
        component: SocialmediaDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.socialmediaDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'socialmedia-details/:id',
        component: SocialmediaDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.socialmediaDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socialmediaDetailsPopupRoute: Routes = [
    {
        path: 'socialmedia-details-new',
        component: SocialmediaDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.socialmediaDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'socialmedia-details/:id/edit',
        component: SocialmediaDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.socialmediaDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'socialmedia-details/:id/delete',
        component: SocialmediaDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.socialmediaDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
