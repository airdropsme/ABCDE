import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegisteredUser } from './registered-user.model';
import { RegisteredUserPopupService } from './registered-user-popup.service';
import { RegisteredUserService } from './registered-user.service';

@Component({
    selector: 'jhi-registered-user-dialog',
    templateUrl: './registered-user-dialog.component.html'
})
export class RegisteredUserDialogComponent implements OnInit {

    registeredUser: RegisteredUser;
    isSaving: boolean;
    joinDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private registeredUserService: RegisteredUserService,
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
        if (this.registeredUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registeredUserService.update(this.registeredUser));
        } else {
            this.subscribeToSaveResponse(
                this.registeredUserService.create(this.registeredUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RegisteredUser>>) {
        result.subscribe((res: HttpResponse<RegisteredUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RegisteredUser) {
        this.eventManager.broadcast({ name: 'registeredUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-registered-user-popup',
    template: ''
})
export class RegisteredUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registeredUserPopupService: RegisteredUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.registeredUserPopupService
                    .open(RegisteredUserDialogComponent as Component, params['id']);
            } else {
                this.registeredUserPopupService
                    .open(RegisteredUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
