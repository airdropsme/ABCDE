import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmailProvider } from './email-provider.model';
import { EmailProviderService } from './email-provider.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-email-provider',
    templateUrl: './email-provider.component.html'
})
export class EmailProviderComponent implements OnInit, OnDestroy {
emailProviders: EmailProvider[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emailProviderService: EmailProviderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emailProviderService.query().subscribe(
            (res: HttpResponse<EmailProvider[]>) => {
                this.emailProviders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmailProviders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmailProvider) {
        return item.id;
    }
    registerChangeInEmailProviders() {
        this.eventSubscriber = this.eventManager.subscribe('emailProviderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
