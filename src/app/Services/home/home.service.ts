import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCurrentUser(): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_current_user, this.currentUserBody(), {
      headers: { 'content-type': 'application/json' }
    });
  }


  public currentUserBody() {
    return {
      Mode: "0",
      MethodName: "Sel_CurrentUser"
    }
  }
}
