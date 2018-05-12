import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RegisteredUser } from './registered-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RegisteredUser>;

@Injectable()
export class RegisteredUserService {

    private resourceUrl =  SERVER_API_URL + 'api/registered-users';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(registeredUser: RegisteredUser): Observable<EntityResponseType> {
        const copy = this.convert(registeredUser);
        return this.http.post<RegisteredUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(registeredUser: RegisteredUser): Observable<EntityResponseType> {
        const copy = this.convert(registeredUser);
        return this.http.put<RegisteredUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RegisteredUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RegisteredUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegisteredUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegisteredUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegisteredUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RegisteredUser[]>): HttpResponse<RegisteredUser[]> {
        const jsonResponse: RegisteredUser[] = res.body;
        const body: RegisteredUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RegisteredUser.
     */
    private convertItemFromServer(registeredUser: RegisteredUser): RegisteredUser {
        const copy: RegisteredUser = Object.assign({}, registeredUser);
        copy.joinDate = this.dateUtils
            .convertLocalDateFromServer(registeredUser.joinDate);
        return copy;
    }

    /**
     * Convert a RegisteredUser to a JSON which can be sent to the server.
     */
    private convert(registeredUser: RegisteredUser): RegisteredUser {
        const copy: RegisteredUser = Object.assign({}, registeredUser);
        copy.joinDate = this.dateUtils
            .convertLocalDateToServer(registeredUser.joinDate);
        return copy;
    }
}
