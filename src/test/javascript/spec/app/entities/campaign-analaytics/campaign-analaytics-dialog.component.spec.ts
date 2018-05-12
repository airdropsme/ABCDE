/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { CampaignAnalayticsDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics-dialog.component';
import { CampaignAnalayticsService } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.service';
import { CampaignAnalaytics } from '../../../../../../main/webapp/app/entities/campaign-analaytics/campaign-analaytics.model';
import { CampaignDetailsService } from '../../../../../../main/webapp/app/entities/campaign-details';

describe('Component Tests', () => {

    describe('CampaignAnalaytics Management Dialog Component', () => {
        let comp: CampaignAnalayticsDialogComponent;
        let fixture: ComponentFixture<CampaignAnalayticsDialogComponent>;
        let service: CampaignAnalayticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [CampaignAnalayticsDialogComponent],
                providers: [
                    CampaignDetailsService,
                    CampaignAnalayticsService
                ]
            })
            .overrideTemplate(CampaignAnalayticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignAnalayticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignAnalayticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignAnalaytics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignAnalaytics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignAnalayticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignAnalaytics();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignAnalaytics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignAnalayticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
