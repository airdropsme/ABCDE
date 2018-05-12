/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignWinnerDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner-dialog.component';
import { CampaignWinnerService } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.service';
import { CampaignWinner } from '../../../../../../main/webapp/app/entities/campaign-winner/campaign-winner.model';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details';

describe('Component Tests', () => {

    describe('CampaignWinner Management Dialog Component', () => {
        let comp: CampaignWinnerDialogComponent;
        let fixture: ComponentFixture<CampaignWinnerDialogComponent>;
        let service: CampaignWinnerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignWinnerDialogComponent],
                providers: [
                    CampaignDetailsService,
                    CampaignWinnerService
                ]
            })
            .overrideTemplate(CampaignWinnerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignWinnerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignWinnerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignWinner(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignWinner = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignWinnerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignWinner();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignWinner = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignWinnerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
