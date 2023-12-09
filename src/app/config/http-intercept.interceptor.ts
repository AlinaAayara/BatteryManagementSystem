import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedDataService } from '../Services/shared-data.service';

@Injectable()
export class HttpInterceptInterceptor implements HttpInterceptor {

  constructor(
    public sharedDataService: SharedDataService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.endsWith("authentication")) {
      return next.handle(request);
    }
    else {
      return next.handle(this.addAuthToken(request));
    }

  }
  addAuthToken(request: HttpRequest<any>) {
    const token = this.sharedDataService.getToken();

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
