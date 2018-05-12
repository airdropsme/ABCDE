import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignRewards } from './campaign-rewards.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignRewards>;

@Injectable()
export class CampaignRewardsService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-rewards';

    constructor(private http: HttpClient) { }

    create(campaignRewards: CampaignRewards): Observable<EntityResponseType> {
        const copy = this.convert(campaignRewards);
        return this.http.post<CampaignRewards>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignRewards: CampaignRewards): Observable<EntityResponseType> {
        const copy = this.convert(campaignRewards);
        return this.http.put<CampaignRewards>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignRewards>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignRewards[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignRewards[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignRewards[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignRewards = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignRewards[]>): HttpResponse<CampaignRewards[]> {
        const jsonResponse: CampaignRewards[] = res.body;
        const body: CampaignRewards[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignRewards.
     */
    private convertItemFromServer(campaignRewards: CampaignRewards): CampaignRewards {
        const copy: CampaignRewards = Object.assign({}, campaignRewards);
        return copy;
    }

    /**
     * Convert a CampaignRewards to a JSON which can be sent to the server.
     */
    private convert(campaignRewards: CampaignRewards): CampaignRewards {
        const copy: CampaignRewards = Object.assign({}, campaignRewards);
        return copy;
    }
}
