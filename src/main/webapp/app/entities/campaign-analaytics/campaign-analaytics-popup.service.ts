import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignAnalaytics } from './campaign-analaytics.model';
import { CampaignAnalayticsService } from './campaign-analaytics.service';

@Injectable()
export class CampaignAnalayticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignAnalayticsService: CampaignAnalayticsService

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
                this.campaignAnalayticsService.find(id)
                    .subscribe((campaignAnalayticsResponse: HttpResponse<CampaignAnalaytics>) => {
                        const campaignAnalaytics: CampaignAnalaytics = campaignAnalayticsResponse.body;
                        this.ngbModalRef = this.campaignAnalayticsModalRef(component, campaignAnalaytics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignAnalayticsModalRef(component, new CampaignAnalaytics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignAnalayticsModalRef(component: Component, campaignAnalaytics: CampaignAnalaytics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignAnalaytics = campaignAnalaytics;
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
