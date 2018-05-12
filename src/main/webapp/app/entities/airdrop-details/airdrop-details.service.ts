import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AirdropDetails } from './airdrop-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AirdropDetails>;

@Injectable()
export class AirdropDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/airdrop-details';

    constructor(private http: HttpClient) { }

    create(airdropDetails: AirdropDetails): Observable<EntityResponseType> {
        const copy = this.convert(airdropDetails);
        return this.http.post<AirdropDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(airdropDetails: AirdropDetails): Observable<EntityResponseType> {
        const copy = this.convert(airdropDetails);
        return this.http.put<AirdropDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AirdropDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AirdropDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<AirdropDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AirdropDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AirdropDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AirdropDetails[]>): HttpResponse<AirdropDetails[]> {
        const jsonResponse: AirdropDetails[] = res.body;
        const body: AirdropDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AirdropDetails.
     */
    private convertItemFromServer(airdropDetails: AirdropDetails): AirdropDetails {
        const copy: AirdropDetails = Object.assign({}, airdropDetails);
        return copy;
    }

    /**
     * Convert a AirdropDetails to a JSON which can be sent to the server.
     */
    private convert(airdropDetails: AirdropDetails): AirdropDetails {
        const copy: AirdropDetails = Object.assign({}, airdropDetails);
        return copy;
    }
}
