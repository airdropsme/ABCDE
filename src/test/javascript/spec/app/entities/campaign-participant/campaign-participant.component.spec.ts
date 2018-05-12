/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignParticipantComponent } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.component';
import { CampaignParticipantService } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.service';
import { CampaignParticipant } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.model';

describe('Component Tests', () => {

    describe('CampaignParticipant Management Component', () => {
        let comp: CampaignParticipantComponent;
        let fixture: ComponentFixture<CampaignParticipantComponent>;
        let service: CampaignParticipantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignParticipantComponent],
                providers: [
                    CampaignParticipantService
                ]
            })
            .overrideTemplate(CampaignParticipantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignParticipantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignParticipantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignParticipant(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignParticipants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
