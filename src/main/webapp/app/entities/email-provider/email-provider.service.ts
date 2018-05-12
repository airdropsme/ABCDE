import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EmailProvider } from './email-provider.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmailProvider>;

@Injectable()
export class EmailProviderService {

    private resourceUrl =  SERVER_API_URL + 'api/email-providers';

    constructor(private http: HttpClient) { }

    create(emailProvider: EmailProvider): Observable<EntityResponseType> {
        const copy = this.convert(emailProvider);
        return this.http.post<EmailProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(emailProvider: EmailProvider): Observable<EntityResponseType> {
        const copy = this.convert(emailProvider);
        return this.http.put<EmailProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmailProvider>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmailProvider[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmailProvider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmailProvider[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmailProvider = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmailProvider[]>): HttpResponse<EmailProvider[]> {
        const jsonResponse: EmailProvider[] = res.body;
        const body: EmailProvider[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmailProvider.
     */
    private convertItemFromServer(emailProvider: EmailProvider): EmailProvider {
        const copy: EmailProvider = Object.assign({}, emailProvider);
        return copy;
    }

    /**
     * Convert a EmailProvider to a JSON which can be sent to the server.
     */
    private convert(emailProvider: EmailProvider): EmailProvider {
        const copy: EmailProvider = Object.assign({}, emailProvider);
        return copy;
    }
}
