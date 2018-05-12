import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignWinner } from './campaign-winner.model';
import { CampaignWinnerService } from './campaign-winner.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campaign-winner',
    templateUrl: './campaign-winner.component.html'
})
export class CampaignWinnerComponent implements OnInit, OnDestroy {
campaignWinners: CampaignWinner[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignWinnerService: CampaignWinnerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campaignWinnerService.query().subscribe(
            (res: HttpResponse<CampaignWinner[]>) => {
                this.campaignWinners = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignWinners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CampaignWinner) {
        return item.id;
    }
    registerChangeInCampaignWinners() {
        this.eventSubscriber = this.eventManager.subscribe('campaignWinnerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
