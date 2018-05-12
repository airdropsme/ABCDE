/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details-detail.component';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details.service';
import { CampaignDetails } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details.model';

describe('Component Tests', () => {

    describe('CampaignDetails Management Detail Component', () => {
        let comp: CampaignDetailsDetailComponent;
        let fixture: ComponentFixture<CampaignDetailsDetailComponent>;
        let service: CampaignDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignDetailsDetailComponent],
                providers: [
                    CampaignDetailsService
                ]
            })
            .overrideTemplate(CampaignDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaignDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
