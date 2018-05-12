import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignRewards } from './campaign-rewards.model';
import { CampaignRewardsPopupService } from './campaign-rewards-popup.service';
import { CampaignRewardsService } from './campaign-rewards.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-campaign-rewards-dialog',
    templateUrl: './campaign-rewards-dialog.component.html'
})
export class CampaignRewardsDialogComponent implements OnInit {

    campaignRewards: CampaignRewards;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignRewardsService: CampaignRewardsService,
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
        if (this.campaignRewards.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignRewardsService.update(this.campaignRewards));
        } else {
            this.subscribeToSaveResponse(
                this.campaignRewardsService.create(this.campaignRewards));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignRewards>>) {
        result.subscribe((res: HttpResponse<CampaignRewards>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignRewards) {
        this.eventManager.broadcast({ name: 'campaignRewardsListModification', content: 'OK'});
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
    selector: 'jhi-campaign-rewards-popup',
    template: ''
})
export class CampaignRewardsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignRewardsPopupService: CampaignRewardsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignRewardsPopupService
                    .open(CampaignRewardsDialogComponent as Component, params['id']);
            } else {
                this.campaignRewardsPopupService
                    .open(CampaignRewardsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
