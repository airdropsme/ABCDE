import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AirdropDetails } from './airdrop-details.model';
import { AirdropDetailsService } from './airdrop-details.service';

@Injectable()
export class AirdropDetailsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private airdropDetailsService: AirdropDetailsService

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
                this.airdropDetailsService.find(id)
                    .subscribe((airdropDetailsResponse: HttpResponse<AirdropDetails>) => {
                        const airdropDetails: AirdropDetails = airdropDetailsResponse.body;
                        this.ngbModalRef = this.airdropDetailsModalRef(component, airdropDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.airdropDetailsModalRef(component, new AirdropDetails());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    airdropDetailsModalRef(component: Component, airdropDetails: AirdropDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.airdropDetails = airdropDetails;
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
