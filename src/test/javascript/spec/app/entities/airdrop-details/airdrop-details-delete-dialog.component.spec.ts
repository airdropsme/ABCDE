/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AbcdeTestModule } from '../../../test.module';
import { AirdropDetailsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details-delete-dialog.component';
import { AirdropDetailsService } from '../../../../../../main/webapp/app/entities/airdrop-details/airdrop-details.service';

describe('Component Tests', () => {

    describe('AirdropDetails Management Delete Component', () => {
        let comp: AirdropDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<AirdropDetailsDeleteDialogComponent>;
        let service: AirdropDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [AirdropDetailsDeleteDialogComponent],
                providers: [
                    AirdropDetailsService
                ]
            })
            .overrideTemplate(AirdropDetailsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirdropDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirdropDetailsService);
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
