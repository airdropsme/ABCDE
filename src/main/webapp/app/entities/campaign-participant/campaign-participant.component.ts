import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignParticipant } from './campaign-participant.model';
import { CampaignParticipantService } from './campaign-participant.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campaign-participant',
    templateUrl: './campaign-participant.component.html'
})
export class CampaignParticipantComponent implements OnInit, OnDestroy {
campaignParticipants: CampaignParticipant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignParticipantService: CampaignParticipantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campaignParticipantService.query().subscribe(
            (res: HttpResponse<CampaignParticipant[]>) => {
                this.campaignParticipants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignParticipants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CampaignParticipant) {
        return item.id;
    }
    registerChangeInCampaignParticipants() {
        this.eventSubscriber = this.eventManager.subscribe('campaignParticipantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
