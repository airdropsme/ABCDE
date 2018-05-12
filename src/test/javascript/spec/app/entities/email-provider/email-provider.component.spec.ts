/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { EmailProviderComponent } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.component';
import { EmailProviderService } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.service';
import { EmailProvider } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.model';

describe('Component Tests', () => {

    describe('EmailProvider Management Component', () => {
        let comp: EmailProviderComponent;
        let fixture: ComponentFixture<EmailProviderComponent>;
        let service: EmailProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [EmailProviderComponent],
                providers: [
                    EmailProviderService
                ]
            })
            .overrideTemplate(EmailProviderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailProviderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmailProvider(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emailProviders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
