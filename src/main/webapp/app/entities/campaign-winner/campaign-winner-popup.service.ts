import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignWinner } from './campaign-winner.model';
import { CampaignWinnerService } from './campaign-winner.service';

@Injectable()
export class CampaignWinnerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignWinnerService: CampaignWinnerService

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
                this.campaignWinnerService.find(id)
                    .subscribe((campaignWinnerResponse: HttpResponse<CampaignWinner>) => {
                        const campaignWinner: CampaignWinner = campaignWinnerResponse.body;
                        this.ngbModalRef = this.campaignWinnerModalRef(component, campaignWinner);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignWinnerModalRef(component, new CampaignWinner());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignWinnerModalRef(component: Component, campaignWinner: CampaignWinner): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignWinner = campaignWinner;
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
