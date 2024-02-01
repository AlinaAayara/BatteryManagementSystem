import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInwardInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddPurchaseInward(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_purchaseinward, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetPurchaseInward(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_purchaseinward, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}