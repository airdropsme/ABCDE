import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AirdropDetails } from './airdrop-details.model';
import { AirdropDetailsService } from './airdrop-details.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-airdrop-details',
    templateUrl: './airdrop-details.component.html'
})
export class AirdropDetailsComponent implements OnInit, OnDestroy {
airdropDetails: AirdropDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private airdropDetailsService: AirdropDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.airdropDetailsService.query().subscribe(
            (res: HttpResponse<AirdropDetails[]>) => {
                this.airdropDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAirdropDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AirdropDetails) {
        return item.id;
    }
    registerChangeInAirdropDetails() {
        this.eventSubscriber = this.eventManager.subscribe('airdropDetailsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
