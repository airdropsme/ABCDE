import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignRewards } from './campaign-rewards.model';
import { CampaignRewardsService } from './campaign-rewards.service';

@Injectable()
export class CampaignRewardsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignRewardsService: CampaignRewardsService

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
                this.campaignRewardsService.find(id)
                    .subscribe((campaignRewardsResponse: HttpResponse<CampaignRewards>) => {
                        const campaignRewards: CampaignRewards = campaignRewardsResponse.body;
                        this.ngbModalRef = this.campaignRewardsModalRef(component, campaignRewards);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignRewardsModalRef(component, new CampaignRewards());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignRewardsModalRef(component: Component, campaignRewards: CampaignRewards): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignRewards = campaignRewards;
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
