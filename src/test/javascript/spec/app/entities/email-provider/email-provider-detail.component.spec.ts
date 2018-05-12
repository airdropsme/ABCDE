/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { EmailProviderDetailComponent } from '../../../../../../main/webapp/app/entities/email-provider/email-provider-detail.component';
import { EmailProviderService } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.service';
import { EmailProvider } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.model';

describe('Component Tests', () => {

    describe('EmailProvider Management Detail Component', () => {
        let comp: EmailProviderDetailComponent;
        let fixture: ComponentFixture<EmailProviderDetailComponent>;
        let service: EmailProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [EmailProviderDetailComponent],
                providers: [
                    EmailProviderService
                ]
            })
            .overrideTemplate(EmailProviderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailProviderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmailProvider(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emailProvider).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
