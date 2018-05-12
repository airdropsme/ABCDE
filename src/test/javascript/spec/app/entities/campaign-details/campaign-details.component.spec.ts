/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignDetailsComponent } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details.component';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details.service';
import { CampaignDetails } from '../../../../../../main/webapp/app/entities/campaign-details/campaign-details.model';

describe('Component Tests', () => {

    describe('CampaignDetails Management Component', () => {
        let comp: CampaignDetailsComponent;
        let fixture: ComponentFixture<CampaignDetailsComponent>;
        let service: CampaignDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignDetailsComponent],
                providers: [
                    CampaignDetailsService
                ]
            })
            .overrideTemplate(CampaignDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
