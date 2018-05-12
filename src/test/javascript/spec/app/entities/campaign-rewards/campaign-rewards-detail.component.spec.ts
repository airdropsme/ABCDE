/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignRewardsDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards-detail.component';
import { CampaignRewardsService } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards.service';
import { CampaignRewards } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards.model';

describe('Component Tests', () => {

    describe('CampaignRewards Management Detail Component', () => {
        let comp: CampaignRewardsDetailComponent;
        let fixture: ComponentFixture<CampaignRewardsDetailComponent>;
        let service: CampaignRewardsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignRewardsDetailComponent],
                providers: [
                    CampaignRewardsService
                ]
            })
            .overrideTemplate(CampaignRewardsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignRewardsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignRewardsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignRewards(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaignRewards).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
