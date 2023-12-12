import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class SmartFormService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetDropdownList(body,url): Observable<any> {
    return this._httpClient.post<any[]>(url, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
