import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddCustomerTransaction(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_customerTransactionInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetCustomerTransaction(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_customerTransactionInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
