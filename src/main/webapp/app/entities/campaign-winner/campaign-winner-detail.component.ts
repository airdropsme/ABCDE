import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignWinner } from './campaign-winner.model';
import { CampaignWinnerService } from './campaign-winner.service';

@Component({
    selector: 'jhi-campaign-winner-detail',
    templateUrl: './campaign-winner-detail.component.html'
})
export class CampaignWinnerDetailComponent implements OnInit, OnDestroy {

    campaignWinner: CampaignWinner;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignWinnerService: CampaignWinnerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignWinners();
    }

    load(id) {
        this.campaignWinnerService.find(id)
            .subscribe((campaignWinnerResponse: HttpResponse<CampaignWinner>) => {
                this.campaignWinner = campaignWinnerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignWinners() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignWinnerListModification',
            (response) => this.load(this.campaignWinner.id)
        );
    }
}
