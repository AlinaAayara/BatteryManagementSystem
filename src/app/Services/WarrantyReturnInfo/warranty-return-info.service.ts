import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class WarrantyReturnInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getWarrantyReturn(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.return_warrantyInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  AddWarranty(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_warrantyInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
