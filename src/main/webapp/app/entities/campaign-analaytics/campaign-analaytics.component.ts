import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignAnalaytics } from './campaign-analaytics.model';
import { CampaignAnalayticsService } from './campaign-analaytics.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campaign-analaytics',
    templateUrl: './campaign-analaytics.component.html'
})
export class CampaignAnalayticsComponent implements OnInit, OnDestroy {
campaignAnalaytics: CampaignAnalaytics[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignAnalayticsService: CampaignAnalayticsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campaignAnalayticsService.query().subscribe(
            (res: HttpResponse<CampaignAnalaytics[]>) => {
                this.campaignAnalaytics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignAnalaytics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CampaignAnalaytics) {
        return item.id;
    }
    registerChangeInCampaignAnalaytics() {
        this.eventSubscriber = this.eventManager.subscribe('campaignAnalayticsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
