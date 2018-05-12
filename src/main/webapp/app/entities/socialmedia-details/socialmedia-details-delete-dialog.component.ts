import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SocialmediaDetails } from './socialmedia-details.model';
import { SocialmediaDetailsPopupService } from './socialmedia-details-popup.service';
import { SocialmediaDetailsService } from './socialmedia-details.service';

@Component({
    selector: 'jhi-socialmedia-details-delete-dialog',
    templateUrl: './socialmedia-details-delete-dialog.component.html'
})
export class SocialmediaDetailsDeleteDialogComponent {

    socialmediaDetails: SocialmediaDetails;

    constructor(
        private socialmediaDetailsService: SocialmediaDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.socialmediaDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'socialmediaDetailsListModification',
                content: 'Deleted an socialmediaDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-socialmedia-details-delete-popup',
    template: ''
})
export class SocialmediaDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socialmediaDetailsPopupService: SocialmediaDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.socialmediaDetailsPopupService
                .open(SocialmediaDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
