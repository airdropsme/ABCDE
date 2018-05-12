import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AirdropDetails } from './airdrop-details.model';
import { AirdropDetailsPopupService } from './airdrop-details-popup.service';
import { AirdropDetailsService } from './airdrop-details.service';

@Component({
    selector: 'jhi-airdrop-details-dialog',
    templateUrl: './airdrop-details-dialog.component.html'
})
export class AirdropDetailsDialogComponent implements OnInit {

    airdropDetails: AirdropDetails;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private airdropDetailsService: AirdropDetailsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airdropDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airdropDetailsService.update(this.airdropDetails));
        } else {
            this.subscribeToSaveResponse(
                this.airdropDetailsService.create(this.airdropDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AirdropDetails>>) {
        result.subscribe((res: HttpResponse<AirdropDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AirdropDetails) {
        this.eventManager.broadcast({ name: 'airdropDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-airdrop-details-popup',
    template: ''
})
export class AirdropDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airdropDetailsPopupService: AirdropDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.airdropDetailsPopupService
                    .open(AirdropDetailsDialogComponent as Component, params['id']);
            } else {
                this.airdropDetailsPopupService
                    .open(AirdropDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
