import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class BasicGroupService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getGroup(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basicGroup, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
