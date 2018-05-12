import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignDetails } from './campaign-details.model';
import { CampaignDetailsPopupService } from './campaign-details-popup.service';
import { CampaignDetailsService } from './campaign-details.service';

@Component({
    selector: 'jhi-campaign-details-delete-dialog',
    templateUrl: './campaign-details-delete-dialog.component.html'
})
export class CampaignDetailsDeleteDialogComponent {

    campaignDetails: CampaignDetails;

    constructor(
        private campaignDetailsService: CampaignDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignDetailsListModification',
                content: 'Deleted an campaignDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-details-delete-popup',
    template: ''
})
export class CampaignDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignDetailsPopupService: CampaignDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignDetailsPopupService
                .open(CampaignDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
