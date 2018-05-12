import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RegisteredUserComponent } from './registered-user.component';
import { RegisteredUserDetailComponent } from './registered-user-detail.component';
import { RegisteredUserPopupComponent } from './registered-user-dialog.component';
import { RegisteredUserDeletePopupComponent } from './registered-user-delete-dialog.component';

export const registeredUserRoute: Routes = [
    {
        path: 'registered-user',
        component: RegisteredUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.registeredUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registered-user/:id',
        component: RegisteredUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.registeredUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registeredUserPopupRoute: Routes = [
    {
        path: 'registered-user-new',
        component: RegisteredUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.registeredUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registered-user/:id/edit',
        component: RegisteredUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.registeredUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registered-user/:id/delete',
        component: RegisteredUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.registeredUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
