import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPartyList(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_party_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  getCategoryList(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basic_category, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  getProductList(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_product_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  AddPurchase(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_purchaseInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  checkSerailNoIsValid(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.getSerialNoForPurchase_purchaseInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
