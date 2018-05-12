import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SocialmediaDetails } from './socialmedia-details.model';
import { SocialmediaDetailsPopupService } from './socialmedia-details-popup.service';
import { SocialmediaDetailsService } from './socialmedia-details.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-socialmedia-details-dialog',
    templateUrl: './socialmedia-details-dialog.component.html'
})
export class SocialmediaDetailsDialogComponent implements OnInit {

    socialmediaDetails: SocialmediaDetails;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private socialmediaDetailsService: SocialmediaDetailsService,
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
        if (this.socialmediaDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.socialmediaDetailsService.update(this.socialmediaDetails));
        } else {
            this.subscribeToSaveResponse(
                this.socialmediaDetailsService.create(this.socialmediaDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SocialmediaDetails>>) {
        result.subscribe((res: HttpResponse<SocialmediaDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SocialmediaDetails) {
        this.eventManager.broadcast({ name: 'socialmediaDetailsListModification', content: 'OK'});
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
    selector: 'jhi-socialmedia-details-popup',
    template: ''
})
export class SocialmediaDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socialmediaDetailsPopupService: SocialmediaDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.socialmediaDetailsPopupService
                    .open(SocialmediaDetailsDialogComponent as Component, params['id']);
            } else {
                this.socialmediaDetailsPopupService
                    .open(SocialmediaDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
