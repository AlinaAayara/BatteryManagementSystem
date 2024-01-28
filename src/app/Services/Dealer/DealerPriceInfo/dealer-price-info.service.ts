import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';
import { DealerAppUrl } from 'src/app/config/dealer-api';
import { DistributorAppUrl } from 'src/app/config/distributor-api';
import { ManufacturerAppUrl } from 'src/app/config/manufacturer-api';

@Injectable({
  providedIn: 'root'
})
export class DealerPriceInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddDealerPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(DealerAppUrl.API.add_dealerPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetDealerPrice(body): Observable<any> {
    return this._httpClient.post<any[]>(DealerAppUrl.API.get_dealerPriceInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
