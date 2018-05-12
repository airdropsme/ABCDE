import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmailProvider } from './email-provider.model';
import { EmailProviderPopupService } from './email-provider-popup.service';
import { EmailProviderService } from './email-provider.service';
import { CampaignDetails, CampaignDetailsService } from '../campaign-details';

@Component({
    selector: 'jhi-email-provider-dialog',
    templateUrl: './email-provider-dialog.component.html'
})
export class EmailProviderDialogComponent implements OnInit {

    emailProvider: EmailProvider;
    isSaving: boolean;

    campaigndetails: CampaignDetails[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emailProviderService: EmailProviderService,
        private campaignDetailsService: CampaignDetailsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.campaignDetailsService.query()
            .subscribe((res: HttpResponse<CampaignDetails[]>) => { this.campaigndetails = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emailProvider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emailProviderService.update(this.emailProvider));
        } else {
            this.subscribeToSaveResponse(
                this.emailProviderService.create(this.emailProvider));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmailProvider>>) {
        result.subscribe((res: HttpResponse<EmailProvider>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmailProvider) {
        this.eventManager.broadcast({ name: 'emailProviderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCampaignDetailsById(index: number, item: CampaignDetails) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-email-provider-popup',
    template: ''
})
export class EmailProviderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailProviderPopupService: EmailProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emailProviderPopupService
                    .open(EmailProviderDialogComponent as Component, params['id']);
            } else {
                this.emailProviderPopupService
                    .open(EmailProviderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
