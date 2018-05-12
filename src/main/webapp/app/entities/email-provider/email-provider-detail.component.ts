import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmailProvider } from './email-provider.model';
import { EmailProviderService } from './email-provider.service';

@Component({
    selector: 'jhi-email-provider-detail',
    templateUrl: './email-provider-detail.component.html'
})
export class EmailProviderDetailComponent implements OnInit, OnDestroy {

    emailProvider: EmailProvider;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emailProviderService: EmailProviderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmailProviders();
    }

    load(id) {
        this.emailProviderService.find(id)
            .subscribe((emailProviderResponse: HttpResponse<EmailProvider>) => {
                this.emailProvider = emailProviderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmailProviders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emailProviderListModification',
            (response) => this.load(this.emailProvider.id)
        );
    }
}
