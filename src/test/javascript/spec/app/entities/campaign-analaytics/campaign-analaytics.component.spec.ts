/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignAnalayticsComponent } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.component';
import { CampaignAnalayticsService } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.service';
import { CampaignAnalaytics } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.model';

describe('Component Tests', () => {

    describe('CampaignAnalaytics Management Component', () => {
        let comp: CampaignAnalayticsComponent;
        let fixture: ComponentFixture<CampaignAnalayticsComponent>;
        let service: CampaignAnalayticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignAnalayticsComponent],
                providers: [
                    CampaignAnalayticsService
                ]
            })
            .overrideTemplate(CampaignAnalayticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignAnalayticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignAnalayticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignAnalaytics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignAnalaytics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
