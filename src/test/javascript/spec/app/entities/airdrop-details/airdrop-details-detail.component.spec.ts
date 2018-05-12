/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { AirdropDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details-detail.component';
import { AirdropDetailsService } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.service';
import { AirdropDetails } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.model';

describe('Component Tests', () => {

    describe('AirdropDetails Management Detail Component', () => {
        let comp: AirdropDetailsDetailComponent;
        let fixture: ComponentFixture<AirdropDetailsDetailComponent>;
        let service: AirdropDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [AirdropDetailsDetailComponent],
                providers: [
                    AirdropDetailsService
                ]
            })
            .overrideTemplate(AirdropDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirdropDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirdropDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AirdropDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.airdropDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
