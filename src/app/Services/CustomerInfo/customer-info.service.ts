import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddCustomer(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_customerInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetCustomer(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_customerInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
