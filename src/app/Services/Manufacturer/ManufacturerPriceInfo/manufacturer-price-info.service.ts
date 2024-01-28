import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';
import { ManufacturerAppUrl } from 'src/app/config/manufacturer-api';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerPriceInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddManufacturerPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(ManufacturerAppUrl.API.add_manufacturerPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetManufacturerPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(ManufacturerAppUrl.API.get_manufacturerPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
