import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegisteredUser } from './registered-user.model';
import { RegisteredUserPopupService } from './registered-user-popup.service';
import { RegisteredUserService } from './registered-user.service';

@Component({
    selector: 'jhi-registered-user-delete-dialog',
    templateUrl: './registered-user-delete-dialog.component.html'
})
export class RegisteredUserDeleteDialogComponent {

    registeredUser: RegisteredUser;

    constructor(
        private registeredUserService: RegisteredUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registeredUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registeredUserListModification',
                content: 'Deleted an registeredUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registered-user-delete-popup',
    template: ''
})
export class RegisteredUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registeredUserPopupService: RegisteredUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.registeredUserPopupService
                .open(RegisteredUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
