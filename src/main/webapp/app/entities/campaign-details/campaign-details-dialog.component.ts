import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignDetails } from './campaign-details.model';
import { CampaignDetailsPopupService } from './campaign-details-popup.service';
import { CampaignDetailsService } from './campaign-details.service';
import { AirdropDetails, AirdropDetailsService } from '../airdrop-details';
import { RegisteredUser, RegisteredUserService } from '../registered-user';

@Component({
    selector: 'jhi-campaign-details-dialog',
    templateUrl: './campaign-details-dialog.component.html'
})
export class CampaignDetailsDialogComponent implements OnInit {

    campaignDetails: CampaignDetails;
    isSaving: boolean;

    airdropdetails: AirdropDetails[];

    registeredusers: RegisteredUser[];
    startdateDp: any;
    enddateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignDetailsService: CampaignDetailsService,
        private airdropDetailsService: AirdropDetailsService,
        private registeredUserService: RegisteredUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.airdropDetailsService
            .query({filter: 'campaigndetails-is-null'})
            .subscribe((res: HttpResponse<AirdropDetails[]>) => {
                if (!this.campaignDetails.airdropDetails || !this.campaignDetails.airdropDetails.id) {
                    this.airdropdetails = res.body;
                } else {
                    this.airdropDetailsService
                        .find(this.campaignDetails.airdropDetails.id)
                        .subscribe((subRes: HttpResponse<AirdropDetails>) => {
                            this.airdropdetails = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.registeredUserService
            .query({filter: 'campaigndetails-is-null'})
            .subscribe((res: HttpResponse<RegisteredUser[]>) => {
                if (!this.campaignDetails.registeredUser || !this.campaignDetails.registeredUser.id) {
                    this.registeredusers = res.body;
                } else {
                    this.registeredUserService
                        .find(this.campaignDetails.registeredUser.id)
                        .subscribe((subRes: HttpResponse<RegisteredUser>) => {
                            this.registeredusers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campaignDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignDetailsService.update(this.campaignDetails));
        } else {
            this.subscribeToSaveResponse(
                this.campaignDetailsService.create(this.campaignDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignDetails>>) {
        result.subscribe((res: HttpResponse<CampaignDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignDetails) {
        this.eventManager.broadcast({ name: 'campaignDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAirdropDetailsById(index: number, item: AirdropDetails) {
        return item.id;
    }

    trackRegisteredUserById(index: number, item: RegisteredUser) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-campaign-details-popup',
    template: ''
})
export class CampaignDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignDetailsPopupService: CampaignDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignDetailsPopupService
                    .open(CampaignDetailsDialogComponent as Component, params['id']);
            } else {
                this.campaignDetailsPopupService
                    .open(CampaignDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
