import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddProduct(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_product_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetProduct(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_product_info, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
