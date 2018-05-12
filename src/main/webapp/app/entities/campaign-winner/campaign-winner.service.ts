import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignWinner } from './campaign-winner.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignWinner>;

@Injectable()
export class CampaignWinnerService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-winners';

    constructor(private http: HttpClient) { }

    create(campaignWinner: CampaignWinner): Observable<EntityResponseType> {
        const copy = this.convert(campaignWinner);
        return this.http.post<CampaignWinner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignWinner: CampaignWinner): Observable<EntityResponseType> {
        const copy = this.convert(campaignWinner);
        return this.http.put<CampaignWinner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignWinner>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignWinner[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignWinner[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignWinner[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignWinner = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignWinner[]>): HttpResponse<CampaignWinner[]> {
        const jsonResponse: CampaignWinner[] = res.body;
        const body: CampaignWinner[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignWinner.
     */
    private convertItemFromServer(campaignWinner: CampaignWinner): CampaignWinner {
        const copy: CampaignWinner = Object.assign({}, campaignWinner);
        return copy;
    }

    /**
     * Convert a CampaignWinner to a JSON which can be sent to the server.
     */
    private convert(campaignWinner: CampaignWinner): CampaignWinner {
        const copy: CampaignWinner = Object.assign({}, campaignWinner);
        return copy;
    }
}
