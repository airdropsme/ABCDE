import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SocialmediaDetails } from './socialmedia-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SocialmediaDetails>;

@Injectable()
export class SocialmediaDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/socialmedia-details';

    constructor(private http: HttpClient) { }

    create(socialmediaDetails: SocialmediaDetails): Observable<EntityResponseType> {
        const copy = this.convert(socialmediaDetails);
        return this.http.post<SocialmediaDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(socialmediaDetails: SocialmediaDetails): Observable<EntityResponseType> {
        const copy = this.convert(socialmediaDetails);
        return this.http.put<SocialmediaDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SocialmediaDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SocialmediaDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<SocialmediaDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SocialmediaDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SocialmediaDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SocialmediaDetails[]>): HttpResponse<SocialmediaDetails[]> {
        const jsonResponse: SocialmediaDetails[] = res.body;
        const body: SocialmediaDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SocialmediaDetails.
     */
    private convertItemFromServer(socialmediaDetails: SocialmediaDetails): SocialmediaDetails {
        const copy: SocialmediaDetails = Object.assign({}, socialmediaDetails);
        return copy;
    }

    /**
     * Convert a SocialmediaDetails to a JSON which can be sent to the server.
     */
    private convert(socialmediaDetails: SocialmediaDetails): SocialmediaDetails {
        const copy: SocialmediaDetails = Object.assign({}, socialmediaDetails);
        return copy;
    }
}
