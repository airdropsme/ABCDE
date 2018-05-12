/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { EmailProviderDialogComponent } from '../../../../../../main/webapp/app/entities/email-provider/email-provider-dialog.component';
import { EmailProviderService } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.service';
import { EmailProvider } from '../../../../../../main/webapp/app/entities/email-provider/email-provider.model';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details';

describe('Component Tests', () => {

    describe('EmailProvider Management Dialog Component', () => {
        let comp: EmailProviderDialogComponent;
        let fixture: ComponentFixture<EmailProviderDialogComponent>;
        let service: EmailProviderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [EmailProviderDialogComponent],
                providers: [
                    CampaignDetailsService,
                    EmailProviderService
                ]
            })
            .overrideTemplate(EmailProviderDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailProviderDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailProviderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmailProvider(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.emailProvider = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emailProviderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmailProvider();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.emailProvider = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emailProviderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
