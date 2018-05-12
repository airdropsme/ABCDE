import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RegisteredUser } from './registered-user.model';
import { RegisteredUserService } from './registered-user.service';

@Component({
    selector: 'jhi-registered-user-detail',
    templateUrl: './registered-user-detail.component.html'
})
export class RegisteredUserDetailComponent implements OnInit, OnDestroy {

    registeredUser: RegisteredUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registeredUserService: RegisteredUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegisteredUsers();
    }

    load(id) {
        this.registeredUserService.find(id)
            .subscribe((registeredUserResponse: HttpResponse<RegisteredUser>) => {
                this.registeredUser = registeredUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegisteredUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registeredUserListModification',
            (response) => this.load(this.registeredUser.id)
        );
    }
}
