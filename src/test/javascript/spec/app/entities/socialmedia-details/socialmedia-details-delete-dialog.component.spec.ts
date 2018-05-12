/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { SocialmediaDetailsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details-delete-dialog.component';
import { SocialmediaDetailsService } from '../../../../../../main/webapp/app/entities/socialmedia-details/socialmedia-details.service';

describe('Component Tests', () => {

    describe('SocialmediaDetails Management Delete Component', () => {
        let comp: SocialmediaDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<SocialmediaDetailsDeleteDialogComponent>;
        let service: SocialmediaDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [SocialmediaDetailsDeleteDialogComponent],
                providers: [
                    SocialmediaDetailsService
                ]
            })
            .overrideTemplate(SocialmediaDetailsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialmediaDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialmediaDetailsService);
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
