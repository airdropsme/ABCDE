import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignParticipant } from './campaign-participant.model';
import { CampaignParticipantPopupService } from './campaign-participant-popup.service';
import { CampaignParticipantService } from './campaign-participant.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-campaign-participant-dialog',
    templateUrl: './campaign-participant-dialog.component.html'
})
export class CampaignParticipantDialogComponent implements OnInit {

    campaignParticipant: CampaignParticipant;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignParticipantService: CampaignParticipantService,
        private campaignDetailsService: CampaignDetailsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.campaignDetailsService.query()
            .subscribe((res: HttpResponse<CampaignDetails[]>) => { this.campaigndetails = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campaignParticipant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignParticipantService.update(this.campaignParticipant));
        } else {
            this.subscribeToSaveResponse(
                this.campaignParticipantService.create(this.campaignParticipant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignParticipant>>) {
        result.subscribe((res: HttpResponse<CampaignParticipant>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignParticipant) {
        this.eventManager.broadcast({ name: 'campaignParticipantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCampaignDetailsById(index: number, item: CampaignDetails) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-campaign-participant-popup',
    template: ''
})
export class CampaignParticipantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignParticipantPopupService: CampaignParticipantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignParticipantPopupService
                    .open(CampaignParticipantDialogComponent as Component, params['id']);
            } else {
                this.campaignParticipantPopupService
                    .open(CampaignParticipantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
