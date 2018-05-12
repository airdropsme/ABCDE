/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbcdeTestModule } from '../../../test.module';
import { RegisteredUserComponent } from '../../../../../../main/webapp/app/entities/registered-user/registered-user.component';
import { RegisteredUserService } from '../../../../../../main/webapp/app/entities/registered-user/registered-user.service';
import { RegisteredUser } from '../../../../../../main/webapp/app/entities/registered-user/registered-user.model';

describe('Component Tests', () => {

    describe('RegisteredUser Management Component', () => {
        let comp: RegisteredUserComponent;
        let fixture: ComponentFixture<RegisteredUserComponent>;
        let service: RegisteredUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AbcdeTestModule],
                declarations: [RegisteredUserComponent],
                providers: [
                    RegisteredUserService
                ]
            })
            .overrideTemplate(RegisteredUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegisteredUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegisteredUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RegisteredUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.registeredUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
