import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignDetails } from './campaign-details.model';
import { CampaignDetailsService } from './campaign-details.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campaign-details',
    templateUrl: './campaign-details.component.html'
})
export class CampaignDetailsComponent implements OnInit, OnDestroy {
campaignDetails: CampaignDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignDetailsService: CampaignDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campaignDetailsService.query().subscribe(
            (res: HttpResponse<CampaignDetails[]>) => {
                this.campaignDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CampaignDetails) {
        return item.id;
    }
    registerChangeInCampaignDetails() {
        this.eventSubscriber = this.eventManager.subscribe('campaignDetailsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
