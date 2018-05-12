import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignParticipant } from './campaign-participant.model';
import { CampaignParticipantPopupService } from './campaign-participant-popup.service';
import { CampaignParticipantService } from './campaign-participant.service';

@Component({
    selector: 'jhi-campaign-participant-delete-dialog',
    templateUrl: './campaign-participant-delete-dialog.component.html'
})
export class CampaignParticipantDeleteDialogComponent {

    campaignParticipant: CampaignParticipant;

    constructor(
        private campaignParticipantService: CampaignParticipantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignParticipantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignParticipantListModification',
                content: 'Deleted an campaignParticipant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-participant-delete-popup',
    template: ''
})
export class CampaignParticipantDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignParticipantPopupService: CampaignParticipantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignParticipantPopupService
                .open(CampaignParticipantDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
