/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignWinnerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner-delete-dialog.component';
import { CampaignWinnerService } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.service';

describe('Component Tests', () => {

    describe('CampaignWinner Management Delete Component', () => {
        let comp: CampaignWinnerDeleteDialogComponent;
        let fixture: ComponentFixture<CampaignWinnerDeleteDialogComponent>;
        let service: CampaignWinnerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignWinnerDeleteDialogComponent],
                providers: [
                    CampaignWinnerService
                ]
            })
            .overrideTemplate(CampaignWinnerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignWinnerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignWinnerService);
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
