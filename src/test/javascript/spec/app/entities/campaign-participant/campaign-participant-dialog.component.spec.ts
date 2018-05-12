/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignParticipantDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant-dialog.component';
import { CampaignParticipantService } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.service';
import { CampaignParticipant } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.model';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details';

describe('Component Tests', () => {

    describe('CampaignParticipant Management Dialog Component', () => {
        let comp: CampaignParticipantDialogComponent;
        let fixture: ComponentFixture<CampaignParticipantDialogComponent>;
        let service: CampaignParticipantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignParticipantDialogComponent],
                providers: [
                    CampaignDetailsService,
                    CampaignParticipantService
                ]
            })
            .overrideTemplate(CampaignParticipantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignParticipantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignParticipantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignParticipant(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignParticipant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignParticipantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignParticipant();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignParticipant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignParticipantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
