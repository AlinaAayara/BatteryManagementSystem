import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';
import { DistributorAppUrl } from 'src/app/config/distributor-api';
import { ManufacturerAppUrl } from 'src/app/config/manufacturer-api';

@Injectable({
  providedIn: 'root'
})
export class DistributorPriceInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddDistributorPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(DistributorAppUrl.API.add_distributorPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetDistributorPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(DistributorAppUrl.API.get_distributorPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
