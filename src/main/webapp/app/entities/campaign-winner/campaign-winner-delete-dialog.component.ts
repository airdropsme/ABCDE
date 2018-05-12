import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignWinner } from './campaign-winner.model';
import { CampaignWinnerPopupService } from './campaign-winner-popup.service';
import { CampaignWinnerService } from './campaign-winner.service';

@Component({
    selector: 'jhi-campaign-winner-delete-dialog',
    templateUrl: './campaign-winner-delete-dialog.component.html'
})
export class CampaignWinnerDeleteDialogComponent {

    campaignWinner: CampaignWinner;

    constructor(
        private campaignWinnerService: CampaignWinnerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignWinnerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignWinnerListModification',
                content: 'Deleted an campaignWinner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-winner-delete-popup',
    template: ''
})
export class CampaignWinnerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignWinnerPopupService: CampaignWinnerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignWinnerPopupService
                .open(CampaignWinnerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
