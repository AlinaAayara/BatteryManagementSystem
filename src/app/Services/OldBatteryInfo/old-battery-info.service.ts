import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class OldBatteryInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddOldBattery(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_oldBatteryInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetOldBattery(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_oldBatteryInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
