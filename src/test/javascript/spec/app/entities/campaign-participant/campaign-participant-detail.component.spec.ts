/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignParticipantDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant-detail.component';
import { CampaignParticipantService } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.service';
import { CampaignParticipant } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.model';

describe('Component Tests', () => {

    describe('CampaignParticipant Management Detail Component', () => {
        let comp: CampaignParticipantDetailComponent;
        let fixture: ComponentFixture<CampaignParticipantDetailComponent>;
        let service: CampaignParticipantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignParticipantDetailComponent],
                providers: [
                    CampaignParticipantService
                ]
            })
            .overrideTemplate(CampaignParticipantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignParticipantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignParticipantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignParticipant(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaignParticipant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
