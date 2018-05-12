/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignWinnerComponent } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.component';
import { CampaignWinnerService } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.service';
import { CampaignWinner } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.model';

describe('Component Tests', () => {

    describe('CampaignWinner Management Component', () => {
        let comp: CampaignWinnerComponent;
        let fixture: ComponentFixture<CampaignWinnerComponent>;
        let service: CampaignWinnerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignWinnerComponent],
                providers: [
                    CampaignWinnerService
                ]
            })
            .overrideTemplate(CampaignWinnerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignWinnerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignWinnerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignWinner(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignWinners[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
