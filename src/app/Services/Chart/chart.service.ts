import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetSaleChart(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_salechart, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetPurchaseChart(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_purchasechart, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetCustomerBalanceChart(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_customerbalancechart, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetDSDLPartyBalance(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_DSDLPartyBalancechart, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  GetDSDLListDeailDashboard(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_purchaseInfoByID, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

}
