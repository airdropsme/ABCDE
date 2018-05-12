import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SocialmediaDetails } from './socialmedia-details.model';
import { SocialmediaDetailsService } from './socialmedia-details.service';

@Component({
    selector: 'jhi-socialmedia-details-detail',
    templateUrl: './socialmedia-details-detail.component.html'
})
export class SocialmediaDetailsDetailComponent implements OnInit, OnDestroy {

    socialmediaDetails: SocialmediaDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private socialmediaDetailsService: SocialmediaDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSocialmediaDetails();
    }

    load(id) {
        this.socialmediaDetailsService.find(id)
            .subscribe((socialmediaDetailsResponse: HttpResponse<SocialmediaDetails>) => {
                this.socialmediaDetails = socialmediaDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSocialmediaDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'socialmediaDetailsListModification',
            (response) => this.load(this.socialmediaDetails.id)
        );
    }
}
