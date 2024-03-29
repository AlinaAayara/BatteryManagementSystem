import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class SaleInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getOldManufacturingSerialNo(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_Old_Manufacturing_Serial_No, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  getSerialNoDetail(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_PurchaseProductInfo_BySerialNo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  AddSale(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_saleInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  GetSale(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_saleInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetSaleByID(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_saleInfoByID, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  GetBillNo(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_Next_BillNo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  getAmpList(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basic_amp, body, {
      headers: { 'content-type': 'application/json' }
    });
  }

  getPaymentModeList(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basicPaymentMode, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  
}
