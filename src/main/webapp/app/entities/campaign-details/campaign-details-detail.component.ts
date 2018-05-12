import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignDetails } from './campaign-details.model';
import { CampaignDetailsService } from './campaign-details.service';

@Component({
    selector: 'jhi-campaign-details-detail',
    templateUrl: './campaign-details-detail.component.html'
})
export class CampaignDetailsDetailComponent implements OnInit, OnDestroy {

    campaignDetails: CampaignDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignDetailsService: CampaignDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignDetails();
    }

    load(id) {
        this.campaignDetailsService.find(id)
            .subscribe((campaignDetailsResponse: HttpResponse<CampaignDetails>) => {
                this.campaignDetails = campaignDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignDetailsListModification',
            (response) => this.load(this.campaignDetails.id)
        );
    }
}
