/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AbcdeTestModule } from '../../../test.module';
import { RegisteredUserDetailComponent } from '../../../../../../main/webapp/app/entities/registered-user/registered-user-detail.component';
import { RegisteredUserService } from '../../../../../../main/webapp/app/entities/registered-user/registered-user.service';
import { RegisteredUser } from '../../../../../../main/webapp/app/entities/registered-user/registered-user.model';

describe('Component Tests', () => {

    describe('RegisteredUser Management Detail Component', () => {
        let comp: RegisteredUserDetailComponent;
        let fixture: ComponentFixture<RegisteredUserDetailComponent>;
        let service: RegisteredUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [RegisteredUserDetailComponent],
                providers: [
                    RegisteredUserService
                ]
            })
            .overrideTemplate(RegisteredUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegisteredUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegisteredUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RegisteredUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.registeredUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
