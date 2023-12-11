import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class FirmInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  addFirm(Data: any): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_firm_info, Data, {
      headers: { 'content-type': 'application/json' }
    });
  }
  getFirm(Data: any): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_firm_info, Data, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
