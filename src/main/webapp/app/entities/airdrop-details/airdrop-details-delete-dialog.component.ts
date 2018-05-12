import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AirdropDetails } from './airdrop-details.model';
import { AirdropDetailsPopupService } from './airdrop-details-popup.service';
import { AirdropDetailsService } from './airdrop-details.service';

@Component({
    selector: 'jhi-airdrop-details-delete-dialog',
    templateUrl: './airdrop-details-delete-dialog.component.html'
})
export class AirdropDetailsDeleteDialogComponent {

    airdropDetails: AirdropDetails;

    constructor(
        private airdropDetailsService: AirdropDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airdropDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'airdropDetailsListModification',
                content: 'Deleted an airdropDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-airdrop-details-delete-popup',
    template: ''
})
export class AirdropDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airdropDetailsPopupService: AirdropDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.airdropDetailsPopupService
                .open(AirdropDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
