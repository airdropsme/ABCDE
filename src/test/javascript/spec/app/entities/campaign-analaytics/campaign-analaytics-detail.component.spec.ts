/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignAnalayticsDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics-detail.component';
import { CampaignAnalayticsService } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.service';
import { CampaignAnalaytics } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.model';

describe('Component Tests', () => {

    describe('CampaignAnalaytics Management Detail Component', () => {
        let comp: CampaignAnalayticsDetailComponent;
        let fixture: ComponentFixture<CampaignAnalayticsDetailComponent>;
        let service: CampaignAnalayticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignAnalayticsDetailComponent],
                providers: [
                    CampaignAnalayticsService
                ]
            })
            .overrideTemplate(CampaignAnalayticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignAnalayticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignAnalayticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignAnalaytics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaignAnalaytics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
