import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class SaleReturnInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  SaleReturn(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.saleReturn, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
