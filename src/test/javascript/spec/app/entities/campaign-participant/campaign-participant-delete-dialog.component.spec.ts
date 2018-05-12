/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignParticipantDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant-delete-dialog.component';
import { CampaignParticipantService } from '../../../../../../main/webapp/app/entities/campaign-participant/campaign-participant.service';

describe('Component Tests', () => {

    describe('CampaignParticipant Management Delete Component', () => {
        let comp: CampaignParticipantDeleteDialogComponent;
        let fixture: ComponentFixture<CampaignParticipantDeleteDialogComponent>;
        let service: CampaignParticipantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignParticipantDeleteDialogComponent],
                providers: [
                    CampaignParticipantService
                ]
            })
            .overrideTemplate(CampaignParticipantDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignParticipantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignParticipantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
