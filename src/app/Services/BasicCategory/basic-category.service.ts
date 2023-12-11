import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class BasicCategoryService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  AddCategory(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_basic_category, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetCategory(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basic_category, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
