import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SocialmediaDetails } from './socialmedia-details.model';
import { SocialmediaDetailsService } from './socialmedia-details.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-socialmedia-details',
    templateUrl: './socialmedia-details.component.html'
})
export class SocialmediaDetailsComponent implements OnInit, OnDestroy {
socialmediaDetails: SocialmediaDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private socialmediaDetailsService: SocialmediaDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.socialmediaDetailsService.query().subscribe(
            (res: HttpResponse<SocialmediaDetails[]>) => {
                this.socialmediaDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSocialmediaDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SocialmediaDetails) {
        return item.id;
    }
    registerChangeInSocialmediaDetails() {
        this.eventSubscriber = this.eventManager.subscribe('socialmediaDetailsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
