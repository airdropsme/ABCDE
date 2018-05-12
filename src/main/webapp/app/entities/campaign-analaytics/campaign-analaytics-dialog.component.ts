import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignAnalaytics } from './campaign-analaytics.model';
import { CampaignAnalayticsPopupService } from './campaign-analaytics-popup.service';
import { CampaignAnalayticsService } from './campaign-analaytics.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-campaign-analaytics-dialog',
    templateUrl: './campaign-analaytics-dialog.component.html'
})
export class CampaignAnalayticsDialogComponent implements OnInit {

    campaignAnalaytics: CampaignAnalaytics;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignAnalayticsService: CampaignAnalayticsService,
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
        if (this.campaignAnalaytics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignAnalayticsService.update(this.campaignAnalaytics));
        } else {
            this.subscribeToSaveResponse(
                this.campaignAnalayticsService.create(this.campaignAnalaytics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignAnalaytics>>) {
        result.subscribe((res: HttpResponse<CampaignAnalaytics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignAnalaytics) {
        this.eventManager.broadcast({ name: 'campaignAnalayticsListModification', content: 'OK'});
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
    selector: 'jhi-campaign-analaytics-popup',
    template: ''
})
export class CampaignAnalayticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignAnalayticsPopupService: CampaignAnalayticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignAnalayticsPopupService
                    .open(CampaignAnalayticsDialogComponent as Component, params['id']);
            } else {
                this.campaignAnalayticsPopupService
                    .open(CampaignAnalayticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
