import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegisteredUser } from './registered-user.model';
import { RegisteredUserService } from './registered-user.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-registered-user',
    templateUrl: './registered-user.component.html'
})
export class RegisteredUserComponent implements OnInit, OnDestroy {
registeredUsers: RegisteredUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private registeredUserService: RegisteredUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.registeredUserService.query().subscribe(
            (res: HttpResponse<RegisteredUser[]>) => {
                this.registeredUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegisteredUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RegisteredUser) {
        return item.id;
    }
    registerChangeInRegisteredUsers() {
        this.eventSubscriber = this.eventManager.subscribe('registeredUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
