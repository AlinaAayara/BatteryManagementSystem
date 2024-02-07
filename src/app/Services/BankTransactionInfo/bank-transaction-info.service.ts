import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';
import { DistributorAppUrl } from 'src/app/config/distributor-api';

@Injectable({
  providedIn: 'root'
})
export class BankTransactionInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddBankTransaction(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_bankTransactionInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetBankTransaction(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_bankTransactionInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
