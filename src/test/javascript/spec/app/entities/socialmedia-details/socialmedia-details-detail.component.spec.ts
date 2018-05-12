/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { SocialmediaDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details-detail.component';
import { SocialmediaDetailsService } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.service';
import { SocialmediaDetails } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.model';

describe('Component Tests', () => {

    describe('SocialmediaDetails Management Detail Component', () => {
        let comp: SocialmediaDetailsDetailComponent;
        let fixture: ComponentFixture<SocialmediaDetailsDetailComponent>;
        let service: SocialmediaDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [SocialmediaDetailsDetailComponent],
                providers: [
                    SocialmediaDetailsService
                ]
            })
            .overrideTemplate(SocialmediaDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialmediaDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialmediaDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SocialmediaDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.socialmediaDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
