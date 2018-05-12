/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { SocialmediaDetailsComponent } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.component';
import { SocialmediaDetailsService } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.service';
import { SocialmediaDetails } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.model';

describe('Component Tests', () => {

    describe('SocialmediaDetails Management Component', () => {
        let comp: SocialmediaDetailsComponent;
        let fixture: ComponentFixture<SocialmediaDetailsComponent>;
        let service: SocialmediaDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [SocialmediaDetailsComponent],
                providers: [
                    SocialmediaDetailsService
                ]
            })
            .overrideTemplate(SocialmediaDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialmediaDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialmediaDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SocialmediaDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.socialmediaDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
