import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RegisteredUser } from './registered-user.model';
import { RegisteredUserService } from './registered-user.service';

@Injectable()
export class RegisteredUserPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private registeredUserService: RegisteredUserService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.registeredUserService.find(id)
                    .subscribe((registeredUserResponse: HttpResponse<RegisteredUser>) => {
                        const registeredUser: RegisteredUser = registeredUserResponse.body;
                        if (registeredUser.joinDate) {
                            registeredUser.joinDate = {
                                year: registeredUser.joinDate.getFullYear(),
                                month: registeredUser.joinDate.getMonth() + 1,
                                day: registeredUser.joinDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.registeredUserModalRef(component, registeredUser);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.registeredUserModalRef(component, new RegisteredUser());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    registeredUserModalRef(component: Component, registeredUser: RegisteredUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registeredUser = registeredUser;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
