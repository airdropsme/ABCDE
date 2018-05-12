import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignParticipant } from './campaign-participant.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignParticipant>;

@Injectable()
export class CampaignParticipantService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-participants';

    constructor(private http: HttpClient) { }

    create(campaignParticipant: CampaignParticipant): Observable<EntityResponseType> {
        const copy = this.convert(campaignParticipant);
        return this.http.post<CampaignParticipant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignParticipant: CampaignParticipant): Observable<EntityResponseType> {
        const copy = this.convert(campaignParticipant);
        return this.http.put<CampaignParticipant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignParticipant>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignParticipant[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignParticipant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignParticipant[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignParticipant = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignParticipant[]>): HttpResponse<CampaignParticipant[]> {
        const jsonResponse: CampaignParticipant[] = res.body;
        const body: CampaignParticipant[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignParticipant.
     */
    private convertItemFromServer(campaignParticipant: CampaignParticipant): CampaignParticipant {
        const copy: CampaignParticipant = Object.assign({}, campaignParticipant);
        return copy;
    }

    /**
     * Convert a CampaignParticipant to a JSON which can be sent to the server.
     */
    private convert(campaignParticipant: CampaignParticipant): CampaignParticipant {
        const copy: CampaignParticipant = Object.assign({}, campaignParticipant);
        return copy;
    }
}
