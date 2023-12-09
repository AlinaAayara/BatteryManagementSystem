import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public BasicGroupList = new Subject<any>();
  constructor(
    private _httpClient: HttpClient
  ) { }

  GetLoginInfo(Data: any): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.Login, Data, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
