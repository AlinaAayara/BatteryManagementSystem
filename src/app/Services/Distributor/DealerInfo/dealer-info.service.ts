import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class DealerInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddUser(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_basicuser, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetUser(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basicuser, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
