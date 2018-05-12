/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { AirdropDetailsComponent } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.component';
import { AirdropDetailsService } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.service';
import { AirdropDetails } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.model';

describe('Component Tests', () => {

    describe('AirdropDetails Management Component', () => {
        let comp: AirdropDetailsComponent;
        let fixture: ComponentFixture<AirdropDetailsComponent>;
        let service: AirdropDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [AirdropDetailsComponent],
                providers: [
                    AirdropDetailsService
                ]
            })
            .overrideTemplate(AirdropDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirdropDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirdropDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AirdropDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.airdropDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
