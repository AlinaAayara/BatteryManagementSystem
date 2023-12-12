import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class BasicBranchService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddBranch(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_basic_branch, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetBranch(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basic_branch, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
