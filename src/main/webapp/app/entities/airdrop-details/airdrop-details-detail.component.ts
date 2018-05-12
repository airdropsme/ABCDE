import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AirdropDetails } from './airdrop-details.model';
import { AirdropDetailsService } from './airdrop-details.service';

@Component({
    selector: 'jhi-airdrop-details-detail',
    templateUrl: './airdrop-details-detail.component.html'
})
export class AirdropDetailsDetailComponent implements OnInit, OnDestroy {

    airdropDetails: AirdropDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private airdropDetailsService: AirdropDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAirdropDetails();
    }

    load(id) {
        this.airdropDetailsService.find(id)
            .subscribe((airdropDetailsResponse: HttpResponse<AirdropDetails>) => {
                this.airdropDetails = airdropDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAirdropDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'airdropDetailsListModification',
            (response) => this.load(this.airdropDetails.id)
        );
    }
}
