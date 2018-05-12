import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignRewards } from './campaign-rewards.model';
import { CampaignRewardsService } from './campaign-rewards.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campaign-rewards',
    templateUrl: './campaign-rewards.component.html'
})
export class CampaignRewardsComponent implements OnInit, OnDestroy {
campaignRewards: CampaignRewards[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignRewardsService: CampaignRewardsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campaignRewardsService.query().subscribe(
            (res: HttpResponse<CampaignRewards[]>) => {
                this.campaignRewards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignRewards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CampaignRewards) {
        return item.id;
    }
    registerChangeInCampaignRewards() {
        this.eventSubscriber = this.eventManager.subscribe('campaignRewardsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
