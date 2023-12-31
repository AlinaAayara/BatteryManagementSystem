import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class BasicAmpService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddAmp(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_basic_amp, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetAmp(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basic_amp, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
