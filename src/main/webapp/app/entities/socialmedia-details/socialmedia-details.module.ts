import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    SocialmediaDetailsService,
    SocialmediaDetailsPopupService,
    SocialmediaDetailsComponent,
    SocialmediaDetailsDetailComponent,
    SocialmediaDetailsDialogComponent,
    SocialmediaDetailsPopupComponent,
    SocialmediaDetailsDeletePopupComponent,
    SocialmediaDetailsDeleteDialogComponent,
    socialmediaDetailsRoute,
    socialmediaDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...socialmediaDetailsRoute,
    ...socialmediaDetailsPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SocialmediaDetailsComponent,
        SocialmediaDetailsDetailComponent,
        SocialmediaDetailsDialogComponent,
        SocialmediaDetailsDeleteDialogComponent,
        SocialmediaDetailsPopupComponent,
        SocialmediaDetailsDeletePopupComponent,
    ],
    entryComponents: [
        SocialmediaDetailsComponent,
        SocialmediaDetailsDialogComponent,
        SocialmediaDetailsPopupComponent,
        SocialmediaDetailsDeleteDialogComponent,
        SocialmediaDetailsDeletePopupComponent,
    ],
    providers: [
        SocialmediaDetailsService,
        SocialmediaDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeSocialmediaDetailsModule {}
