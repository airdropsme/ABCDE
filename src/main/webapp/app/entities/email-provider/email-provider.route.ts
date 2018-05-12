import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmailProviderComponent } from './email-provider.component';
import { EmailProviderDetailComponent } from './email-provider-detail.component';
import { EmailProviderPopupComponent } from './email-provider-dialog.component';
import { EmailProviderDeletePopupComponent } from './email-provider-delete-dialog.component';

export const emailProviderRoute: Routes = [
    {
        path: 'email-provider',
        component: EmailProviderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.emailProvider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'email-provider/:id',
        component: EmailProviderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.emailProvider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailProviderPopupRoute: Routes = [
    {
        path: 'email-provider-new',
        component: EmailProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.emailProvider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-provider/:id/edit',
        component: EmailProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.emailProvider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-provider/:id/delete',
        component: EmailProviderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'abcdeApp.emailProvider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
