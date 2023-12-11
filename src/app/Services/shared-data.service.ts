import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subject } from 'rxjs';
import { AppUrl } from '../config/api';
import { DeviceTypes } from '../config/constants';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from '../core/models/current-user';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public isMoreMenuOpened: boolean;
  public UserID;
  deviceType: DeviceTypes;
  public acknowledgeNotifications = new Subject<any>();
  public isMobile = false;
  public isTablet = false;
  public isLargeScreen = false;
  public isMediumScreen = false;
  public currentUser: CurrentUser;

  constructor(
    private _httpClient: HttpClient,
    private deviceService: DeviceDetectorService,
    private jwtHelper: JwtHelperService
  ) {
    if (!this.UserID && sessionStorage.getItem("UserCredential")) {
      // this.loggedUser = new BasicUser(JSON.parse(sessionStorage.getItem("UserCredential") || '{}'));
      // this.UserID = this.loggedUser?.["UserID"];
    }

    this.deviceType = this.deviceService.isMobile() ? DeviceTypes.MOBILE :
      this.deviceService.isDesktop() ? DeviceTypes.DESKTOP :
        this.deviceService.isTablet() ? DeviceTypes.TABLET : DeviceTypes.UNKNOWN;
    this.isMobile = this.deviceType === DeviceTypes.MOBILE;
    this.isTablet = this.deviceType === DeviceTypes.TABLET;

    this.isLargeScreen = window.innerWidth >= 992;
    this.isMediumScreen = window.innerWidth > 767;
  }

  setToken(token: string) {
    localStorage.setItem("JwtToken", token);
  }

  getToken() {
    return localStorage.getItem("JwtToken");
  }
  isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.getToken())
  }
}
