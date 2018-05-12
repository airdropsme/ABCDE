import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmailProvider } from './email-provider.model';
import { EmailProviderPopupService } from './email-provider-popup.service';
import { EmailProviderService } from './email-provider.service';

@Component({
    selector: 'jhi-email-provider-delete-dialog',
    templateUrl: './email-provider-delete-dialog.component.html'
})
export class EmailProviderDeleteDialogComponent {

    emailProvider: EmailProvider;

    constructor(
        private emailProviderService: EmailProviderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailProviderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emailProviderListModification',
                content: 'Deleted an emailProvider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-provider-delete-popup',
    template: ''
})
export class EmailProviderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailProviderPopupService: EmailProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emailProviderPopupService
                .open(EmailProviderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
