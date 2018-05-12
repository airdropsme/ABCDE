/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignWinnerDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner-detail.component';
import { CampaignWinnerService } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.service';
import { CampaignWinner } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.model';

describe('Component Tests', () => {

    describe('CampaignWinner Management Detail Component', () => {
        let comp: CampaignWinnerDetailComponent;
        let fixture: ComponentFixture<CampaignWinnerDetailComponent>;
        let service: CampaignWinnerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignWinnerDetailComponent],
                providers: [
                    CampaignWinnerService
                ]
            })
            .overrideTemplate(CampaignWinnerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignWinnerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignWinnerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignWinner(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaignWinner).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
