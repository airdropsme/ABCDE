import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignDetails } from './campaign-details.model';
import { CampaignDetailsService } from './campaign-details.service';

@Injectable()
export class CampaignDetailsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignDetailsService: CampaignDetailsService

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
                this.campaignDetailsService.find(id)
                    .subscribe((campaignDetailsResponse: HttpResponse<CampaignDetails>) => {
                        const campaignDetails: CampaignDetails = campaignDetailsResponse.body;
                        if (campaignDetails.startdate) {
                            campaignDetails.startdate = {
                                year: campaignDetails.startdate.getFullYear(),
                                month: campaignDetails.startdate.getMonth() + 1,
                                day: campaignDetails.startdate.getDate()
                            };
                        }
                        if (campaignDetails.enddate) {
                            campaignDetails.enddate = {
                                year: campaignDetails.enddate.getFullYear(),
                                month: campaignDetails.enddate.getMonth() + 1,
                                day: campaignDetails.enddate.getDate()
                            };
                        }
                        this.ngbModalRef = this.campaignDetailsModalRef(component, campaignDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignDetailsModalRef(component, new CampaignDetails());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignDetailsModalRef(component: Component, campaignDetails: CampaignDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignDetails = campaignDetails;
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
