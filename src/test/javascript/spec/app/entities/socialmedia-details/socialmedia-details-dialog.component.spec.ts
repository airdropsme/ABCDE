/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { SocialmediaDetailsDialogComponent } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details-dialog.component';
import { SocialmediaDetailsService } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.service';
import { SocialmediaDetails } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.model';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details';

describe('Component Tests', () => {

    describe('SocialmediaDetails Management Dialog Component', () => {
        let comp: SocialmediaDetailsDialogComponent;
        let fixture: ComponentFixture<SocialmediaDetailsDialogComponent>;
        let service: SocialmediaDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [SocialmediaDetailsDialogComponent],
                providers: [
                    CampaignDetailsService,
                    SocialmediaDetailsService
                ]
            })
            .overrideTemplate(SocialmediaDetailsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialmediaDetailsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialmediaDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SocialmediaDetails(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.socialmediaDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'socialmediaDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SocialmediaDetails();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.socialmediaDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'socialmediaDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
