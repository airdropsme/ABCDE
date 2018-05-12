import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignRewards } from './campaign-rewards.model';
import { CampaignRewardsService } from './campaign-rewards.service';

@Component({
    selector: 'jhi-campaign-rewards-detail',
    templateUrl: './campaign-rewards-detail.component.html'
})
export class CampaignRewardsDetailComponent implements OnInit, OnDestroy {

    campaignRewards: CampaignRewards;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignRewardsService: CampaignRewardsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignRewards();
    }

    load(id) {
        this.campaignRewardsService.find(id)
            .subscribe((campaignRewardsResponse: HttpResponse<CampaignRewards>) => {
                this.campaignRewards = campaignRewardsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignRewards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignRewardsListModification',
            (response) => this.load(this.campaignRewards.id)
        );
    }
}
