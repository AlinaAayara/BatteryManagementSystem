import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subject } from 'rxjs';
import { AppUrl } from '../config/api';
import { DeviceTypes } from '../config/constants';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from '../core/models/current-user';
import notie from 'notie';
import { Router } from '@angular/router';


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
  public customerInfoEdit = new Subject<any>();
  public getSelectedCustomer = new Subject<any>();
  public getSelectedParty = new Subject<any>();
  public partyInfoEdit = new Subject<any>();
  public purchaseInfoEdit = new Subject<any>();
  public saleInfoEdit = new Subject<any>();
  public warrantyInfoEdit = new Subject<any>();
  public openReportSlideIn = new Subject<any>();

  constructor(
    private _httpClient: HttpClient,
    private deviceService: DeviceDetectorService,
    private jwtHelper: JwtHelperService,
    public _router: Router
  ) {
    let currentUser = localStorage.getItem("currentUser");
    if (this.currentUser == undefined && currentUser != undefined) {
      this.currentUser = new CurrentUser(JSON.parse(currentUser || '{}'));
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

  success(msg) {
    Swal.fire({
      title: "Done!",
      text: msg,
      icon: "success"
    });
  }

  error(error) {
    Swal.fire({
      title: 'Error!',
      text: error.error,
      icon: 'error',
      confirmButtonText: 'ok'
    })
  }

  checkWriteDeleteAccess(id, access): boolean {
    let filterSubMenu = false;
    this.currentUser?.menu?.forEach((m) => {
      m?.subMenu?.forEach((sub) => {
        if (sub?.subMenuID == id && sub[access] === "1") {
          filterSubMenu = true;
        }
      }
      )
    });
    return filterSubMenu;
  }
  /* used in advance search coponent to get current ID (submenu id from url as query string) submenu details  */
  getCurrentActiveForm(id) {
    let subMenu: any;
    this.currentUser?.menu?.forEach((m) => {
      m?.subMenu?.forEach((sub) => {
        if (sub?.subMenuID == id) {
          subMenu = sub;
        }
      }
      )
    });
    return subMenu;
  }

  deleteRecord(Data: any): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.delete_record, Data, {
      headers: { 'content-type': 'application/json' }
    });
  }

  NotieSuccess(msg) {
    notie.alert({ type: 'success', text: msg, time: 2 });
  }

  NotieError(msg) {
    notie.alert({ type: 'error', text: msg });
  }

  SwalConfirmDeleteForAdvanceSearch(body: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRecord(body).subscribe({
          next: data => {
            this.success("Deleted successfully !");
          },
          error: error => {
            this.error(error)
          }
        });
      }
    });
  }
  clearThingsOnLogout() {
    localStorage.clear();
  }

  logout() {
    this.clearThingsOnLogout();
    this._router.navigate(["Login"]);
  }

  requestBodyForAdvanceSearch(subMenuUrl, CustomerName, CustomerTypeID, serialNo) {
    let obj: any = {};
    switch (subMenuUrl) {
      case "PurchaseInfo":
        CustomerName = [null, undefined, ""].includes(CustomerName) ? "" : CustomerName;
        obj.requestBody = {
          MethodName: "Sel_AdvanceSearch_PurchaseInfo",
          CustomerName: CustomerName,
          Mode: "0"
        };
        obj.Url = AppUrl.API.get_purchaseInfo;
        break;
      case "SaleInfo":
        CustomerName = [null, undefined, ""].includes(CustomerName) ? "" : CustomerName;
        obj.requestBody = {
          MethodName: "Sel_AdvanceSearch_SaleInfo",
          CustomerName: CustomerName,
          SerialNo:serialNo,
          Mode: "0"
        };
        obj.Url = AppUrl.API.get_saleInfo;
        break;
      case "WarrantyInfo":
        CustomerName = [null, undefined, ""].includes(CustomerName) ? "" : CustomerName;
        obj.requestBody = {
          MethodName: "Sel_AdvanceSearch_WarrantyInfo",
          CustomerName: CustomerName,
          Mode: "0"
        };
        obj.Url = AppUrl.API.get_warrantyInfo;
        break;
    }
    return obj;
  }
  advacneSearchPOST(Url: string, Data: any): Observable<any> {
    return this._httpClient.post<any[]>(Url, Data, {
      headers: { 'content-type': 'application/json' }
    });
  }

  /* function will return isShowOnMenuBar based submenu */
  getIsShowOnMenuBar(currentUser, isShowOnMenuBar) {
    currentUser = JSON.parse(JSON.stringify(currentUser));
    let subMenuList: any = [];
    currentUser?.menu?.forEach(menu => {
      menu?.subMenu?.forEach(sub => {
        if (sub.isShowOnMenuBar == isShowOnMenuBar) {
          subMenuList.push(sub);
        }
      })
      menu.subMenu = subMenuList;
      subMenuList = [];
    });
    //currentUser.menu = menuList;
    return currentUser;
  }

  getGST(body): Observable<any> {
    return this._httpClient.post<any[]>(AppUrl.API.get_basicGST, body, {
      headers: { 'content-type': 'application/json' }
    });
  }
}
