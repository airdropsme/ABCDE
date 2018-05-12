import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignParticipant } from './campaign-participant.model';
import { CampaignParticipantService } from './campaign-participant.service';

@Component({
    selector: 'jhi-campaign-participant-detail',
    templateUrl: './campaign-participant-detail.component.html'
})
export class CampaignParticipantDetailComponent implements OnInit, OnDestroy {

    campaignParticipant: CampaignParticipant;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignParticipantService: CampaignParticipantService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignParticipants();
    }

    load(id) {
        this.campaignParticipantService.find(id)
            .subscribe((campaignParticipantResponse: HttpResponse<CampaignParticipant>) => {
                this.campaignParticipant = campaignParticipantResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignParticipants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignParticipantListModification',
            (response) => this.load(this.campaignParticipant.id)
        );
    }
}
