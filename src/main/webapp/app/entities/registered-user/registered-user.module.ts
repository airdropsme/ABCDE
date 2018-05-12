import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    RegisteredUserService,
    RegisteredUserPopupService,
    RegisteredUserComponent,
    RegisteredUserDetailComponent,
    RegisteredUserDialogComponent,
    RegisteredUserPopupComponent,
    RegisteredUserDeletePopupComponent,
    RegisteredUserDeleteDialogComponent,
    registeredUserRoute,
    registeredUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...registeredUserRoute,
    ...registeredUserPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegisteredUserComponent,
        RegisteredUserDetailComponent,
        RegisteredUserDialogComponent,
        RegisteredUserDeleteDialogComponent,
        RegisteredUserPopupComponent,
        RegisteredUserDeletePopupComponent,
    ],
    entryComponents: [
        RegisteredUserComponent,
        RegisteredUserDialogComponent,
        RegisteredUserPopupComponent,
        RegisteredUserDeleteDialogComponent,
        RegisteredUserDeletePopupComponent,
    ],
    providers: [
        RegisteredUserService,
        RegisteredUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeRegisteredUserModule {}
