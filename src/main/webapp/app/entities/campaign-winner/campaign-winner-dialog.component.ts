import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignWinner } from './campaign-winner.model';
import { CampaignWinnerPopupService } from './campaign-winner-popup.service';
import { CampaignWinnerService } from './campaign-winner.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-campaign-winner-dialog',
    templateUrl: './campaign-winner-dialog.component.html'
})
export class CampaignWinnerDialogComponent implements OnInit {

    campaignWinner: CampaignWinner;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignWinnerService: CampaignWinnerService,
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
        if (this.campaignWinner.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignWinnerService.update(this.campaignWinner));
        } else {
            this.subscribeToSaveResponse(
                this.campaignWinnerService.create(this.campaignWinner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignWinner>>) {
        result.subscribe((res: HttpResponse<CampaignWinner>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignWinner) {
        this.eventManager.broadcast({ name: 'campaignWinnerListModification', content: 'OK'});
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
    selector: 'jhi-campaign-winner-popup',
    template: ''
})
export class CampaignWinnerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignWinnerPopupService: CampaignWinnerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignWinnerPopupService
                    .open(CampaignWinnerDialogComponent as Component, params['id']);
            } else {
                this.campaignWinnerPopupService
                    .open(CampaignWinnerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
