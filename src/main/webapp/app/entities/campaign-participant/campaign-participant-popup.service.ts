import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignParticipant } from './campaign-participant.model';
import { CampaignParticipantService } from './campaign-participant.service';

@Injectable()
export class CampaignParticipantPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignParticipantService: CampaignParticipantService

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
                this.campaignParticipantService.find(id)
                    .subscribe((campaignParticipantResponse: HttpResponse<CampaignParticipant>) => {
                        const campaignParticipant: CampaignParticipant = campaignParticipantResponse.body;
                        this.ngbModalRef = this.campaignParticipantModalRef(component, campaignParticipant);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignParticipantModalRef(component, new CampaignParticipant());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignParticipantModalRef(component: Component, campaignParticipant: CampaignParticipant): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignParticipant = campaignParticipant;
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
