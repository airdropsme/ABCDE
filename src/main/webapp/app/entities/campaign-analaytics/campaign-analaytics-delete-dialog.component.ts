import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignAnalaytics } from './campaign-analaytics.model';
import { CampaignAnalayticsPopupService } from './campaign-analaytics-popup.service';
import { CampaignAnalayticsService } from './campaign-analaytics.service';

@Component({
    selector: 'jhi-campaign-analaytics-delete-dialog',
    templateUrl: './campaign-analaytics-delete-dialog.component.html'
})
export class CampaignAnalayticsDeleteDialogComponent {

    campaignAnalaytics: CampaignAnalaytics;

    constructor(
        private campaignAnalayticsService: CampaignAnalayticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignAnalayticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignAnalayticsListModification',
                content: 'Deleted an campaignAnalaytics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-analaytics-delete-popup',
    template: ''
})
export class CampaignAnalayticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignAnalayticsPopupService: CampaignAnalayticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignAnalayticsPopupService
                .open(CampaignAnalayticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
