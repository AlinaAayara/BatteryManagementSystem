import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class ExpenseInfoService {

  constructor(
    private _httpClient: HttpClient
  ) { }
  AddExpense(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.add_expenseInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
  GetExpense(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_expenseInfo, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
