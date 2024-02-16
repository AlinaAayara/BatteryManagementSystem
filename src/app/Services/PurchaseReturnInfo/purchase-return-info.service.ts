import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPurchaseReturnSerialNo(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_purchaseRReturnSerialNo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  AddPurchaseReturn(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_purchaseReturnInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetPurchaseReturn(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_purchaseReturnInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
