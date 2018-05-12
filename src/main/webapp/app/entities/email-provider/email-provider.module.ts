import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbcdeSharedModule } from '../../shared';
import {
    EmailProviderService,
    EmailProviderPopupService,
    EmailProviderComponent,
    EmailProviderDetailComponent,
    EmailProviderDialogComponent,
    EmailProviderPopupComponent,
    EmailProviderDeletePopupComponent,
    EmailProviderDeleteDialogComponent,
    emailProviderRoute,
    emailProviderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emailProviderRoute,
    ...emailProviderPopupRoute,
];

@NgModule({
    imports: [
        AbcdeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmailProviderComponent,
        EmailProviderDetailComponent,
        EmailProviderDialogComponent,
        EmailProviderDeleteDialogComponent,
        EmailProviderPopupComponent,
        EmailProviderDeletePopupComponent,
    ],
    entryComponents: [
        EmailProviderComponent,
        EmailProviderDialogComponent,
        EmailProviderPopupComponent,
        EmailProviderDeleteDialogComponent,
        EmailProviderDeletePopupComponent,
    ],
    providers: [
        EmailProviderService,
        EmailProviderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeEmailProviderModule {}
