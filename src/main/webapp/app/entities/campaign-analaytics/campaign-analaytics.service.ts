import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignAnalaytics } from './campaign-analaytics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignAnalaytics>;

@Injectable()
export class CampaignAnalayticsService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-analaytics';

    constructor(private http: HttpClient) { }

    create(campaignAnalaytics: CampaignAnalaytics): Observable<EntityResponseType> {
        const copy = this.convert(campaignAnalaytics);
        return this.http.post<CampaignAnalaytics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignAnalaytics: CampaignAnalaytics): Observable<EntityResponseType> {
        const copy = this.convert(campaignAnalaytics);
        return this.http.put<CampaignAnalaytics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignAnalaytics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignAnalaytics[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignAnalaytics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignAnalaytics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignAnalaytics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignAnalaytics[]>): HttpResponse<CampaignAnalaytics[]> {
        const jsonResponse: CampaignAnalaytics[] = res.body;
        const body: CampaignAnalaytics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignAnalaytics.
     */
    private convertItemFromServer(campaignAnalaytics: CampaignAnalaytics): CampaignAnalaytics {
        const copy: CampaignAnalaytics = Object.assign({}, campaignAnalaytics);
        return copy;
    }

    /**
     * Convert a CampaignAnalaytics to a JSON which can be sent to the server.
     */
    private convert(campaignAnalaytics: CampaignAnalaytics): CampaignAnalaytics {
        const copy: CampaignAnalaytics = Object.assign({}, campaignAnalaytics);
        return copy;
    }
}
