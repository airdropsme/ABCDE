import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CampaignDetails } from './campaign-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignDetails>;

@Injectable()
export class CampaignDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-details';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(campaignDetails: CampaignDetails): Observable<EntityResponseType> {
        const copy = this.convert(campaignDetails);
        return this.http.post<CampaignDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignDetails: CampaignDetails): Observable<EntityResponseType> {
        const copy = this.convert(campaignDetails);
        return this.http.put<CampaignDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignDetails[]>): HttpResponse<CampaignDetails[]> {
        const jsonResponse: CampaignDetails[] = res.body;
        const body: CampaignDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignDetails.
     */
    private convertItemFromServer(campaignDetails: CampaignDetails): CampaignDetails {
        const copy: CampaignDetails = Object.assign({}, campaignDetails);
        copy.startdate = this.dateUtils
            .convertLocalDateFromServer(campaignDetails.startdate);
        copy.enddate = this.dateUtils
            .convertLocalDateFromServer(campaignDetails.enddate);
        return copy;
    }

    /**
     * Convert a CampaignDetails to a JSON which can be sent to the server.
     */
    private convert(campaignDetails: CampaignDetails): CampaignDetails {
        const copy: CampaignDetails = Object.assign({}, campaignDetails);
        copy.startdate = this.dateUtils
            .convertLocalDateToServer(campaignDetails.startdate);
        copy.enddate = this.dateUtils
            .convertLocalDateToServer(campaignDetails.enddate);
        return copy;
    }
}
