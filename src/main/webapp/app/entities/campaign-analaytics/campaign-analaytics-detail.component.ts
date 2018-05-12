import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignAnalaytics } from './campaign-analaytics.model';
import { CampaignAnalayticsService } from './campaign-analaytics.service';

@Component({
    selector: 'jhi-campaign-analaytics-detail',
    templateUrl: './campaign-analaytics-detail.component.html'
})
export class CampaignAnalayticsDetailComponent implements OnInit, OnDestroy {

    campaignAnalaytics: CampaignAnalaytics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignAnalayticsService: CampaignAnalayticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignAnalaytics();
    }

    load(id) {
        this.campaignAnalayticsService.find(id)
            .subscribe((campaignAnalayticsResponse: HttpResponse<CampaignAnalaytics>) => {
                this.campaignAnalaytics = campaignAnalayticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignAnalaytics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignAnalayticsListModification',
            (response) => this.load(this.campaignAnalaytics.id)
        );
    }
}
