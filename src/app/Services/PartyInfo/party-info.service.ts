import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class PartyInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddParty(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_party_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetParty(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_party_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
