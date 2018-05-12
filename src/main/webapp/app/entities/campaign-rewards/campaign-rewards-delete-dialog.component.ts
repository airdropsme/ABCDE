import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignRewards } from './campaign-rewards.model';
import { CampaignRewardsPopupService } from './campaign-rewards-popup.service';
import { CampaignRewardsService } from './campaign-rewards.service';

@Component({
    selector: 'jhi-campaign-rewards-delete-dialog',
    templateUrl: './campaign-rewards-delete-dialog.component.html'
})
export class CampaignRewardsDeleteDialogComponent {

    campaignRewards: CampaignRewards;

    constructor(
        private campaignRewardsService: CampaignRewardsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignRewardsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignRewardsListModification',
                content: 'Deleted an campaignRewards'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-rewards-delete-popup',
    template: ''
})
export class CampaignRewardsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignRewardsPopupService: CampaignRewardsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignRewardsPopupService
                .open(CampaignRewardsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
