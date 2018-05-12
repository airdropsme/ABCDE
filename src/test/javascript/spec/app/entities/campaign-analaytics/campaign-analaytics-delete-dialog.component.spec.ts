/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignAnalayticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics-delete-dialog.component';
import { CampaignAnalayticsService } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.service';

describe('Component Tests', () => {

    describe('CampaignAnalaytics Management Delete Component', () => {
        let comp: CampaignAnalayticsDeleteDialogComponent;
        let fixture: ComponentFixture<CampaignAnalayticsDeleteDialogComponent>;
        let service: CampaignAnalayticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignAnalayticsDeleteDialogComponent],
                providers: [
                    CampaignAnalayticsService
                ]
            })
            .overrideTemplate(CampaignAnalayticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignAnalayticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignAnalayticsService);
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
