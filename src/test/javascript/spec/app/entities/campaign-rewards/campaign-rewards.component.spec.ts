/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignRewardsComponent } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards.component';
import { CampaignRewardsService } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards.service';
import { CampaignRewards } from '../../../../../../main/webapp/app/entities/campaign-rewards/campaign-rewards.model';

describe('Component Tests', () => {

    describe('CampaignRewards Management Component', () => {
        let comp: CampaignRewardsComponent;
        let fixture: ComponentFixture<CampaignRewardsComponent>;
        let service: CampaignRewardsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignRewardsComponent],
                providers: [
                    CampaignRewardsService
                ]
            })
            .overrideTemplate(CampaignRewardsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignRewardsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignRewardsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignRewards(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignRewards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
