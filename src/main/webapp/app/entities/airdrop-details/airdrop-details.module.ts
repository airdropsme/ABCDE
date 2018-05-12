import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    AirdropDetailsService,
    AirdropDetailsPopupService,
    AirdropDetailsComponent,
    AirdropDetailsDetailComponent,
    AirdropDetailsDialogComponent,
    AirdropDetailsPopupComponent,
    AirdropDetailsDeletePopupComponent,
    AirdropDetailsDeleteDialogComponent,
    airdropDetailsRoute,
    airdropDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...airdropDetailsRoute,
    ...airdropDetailsPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirdropDetailsComponent,
        AirdropDetailsDetailComponent,
        AirdropDetailsDialogComponent,
        AirdropDetailsDeleteDialogComponent,
        AirdropDetailsPopupComponent,
        AirdropDetailsDeletePopupComponent,
    ],
    entryComponents: [
        AirdropDetailsComponent,
        AirdropDetailsDialogComponent,
        AirdropDetailsPopupComponent,
        AirdropDetailsDeleteDialogComponent,
        AirdropDetailsDeletePopupComponent,
    ],
    providers: [
        AirdropDetailsService,
        AirdropDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeAirdropDetailsModule {}
