import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AbcdeCampaignAnalayticsModule } from './campaign-analaytics/campaign-analaytics.module';
import { AbcdeCampaignParticipantModule } from './campaign-participant/campaign-participant.module';
import { AbcdeRegisteredUserModule } from './registered-user/registered-user.module';
import { AbcdeSocialmediaDetailsModule } from './socialmedia-details/socialmedia-details.module';
import { AbcdeCampaignWinnerModule } from './campaign-winner/campaign-winner.module';
import { AbcdeEmailProviderModule } from './email-provider/email-provider.module';
import { AbcdeAirdropDetailsModule } from './airdrop-details/airdrop-details.module';
import { AbcdeCampaignDetailsModule } from './campaign-details/campaign-details.module';
import { AbcdeCampaignRewardsModule } from './campaign-rewards/campaign-rewards.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AbcdeCampaignAnalayticsModule,
        AbcdeCampaignParticipantModule,
        AbcdeRegisteredUserModule,
        AbcdeSocialmediaDetailsModule,
        AbcdeCampaignWinnerModule,
        AbcdeEmailProviderModule,
        AbcdeAirdropDetailsModule,
        AbcdeCampaignDetailsModule,
        AbcdeCampaignRewardsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbcdeEntityModule {}
