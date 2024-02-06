import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class BasicBankService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddBank(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_basicbank, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetBank(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basicbank, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
