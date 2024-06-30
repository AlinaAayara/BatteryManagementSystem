import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseInfoService } from 'src/app/Services/PurchaseInfo/purchase-info.service';
import { SaleInfoService } from 'src/app/Services/SaleInfo/sale-info.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Constant } from 'src/app/config/constants';
import { SubMenu } from 'src/app/core/models/current-user';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  public reportList: SubMenu[] = [];;
  public ReportID;
  public categoryList: any;
  public productList: any;
  public partyList: any;
  public CustomerTypes;
  public ampList: any;
  public activeReport: SubMenu;
  public CurrentUserType: string;

  constructor(
    private _sharedDataService: SharedDataService,
    private _purchaseInfoService: PurchaseInfoService,
    private _saleInfoService: SaleInfoService,
  ) {

  }
  ngOnInit(): void {
    this.CustomerTypes = JSON.parse(JSON.stringify(Constant.CUSTOMER_TYPE));
    /* option for select all */
    this.CustomerTypes.push({
      Value: "",
      Text: "All"
    });


    this.reportList = [];
    this._sharedDataService.currentUser?.menu?.forEach(menu => {
      menu?.subMenu?.forEach(sub => {
        if (sub.isShowOnMenuBar == "0") {
          this.reportList.push(sub);
        }
      })
    });

    this.CurrentUserType = this._sharedDataService?.currentUser?.userType;
  }

  /* get party list to show dropwon */
  getPartyList() {
    this._purchaseInfoService.getPartyList(this.getPartyListRequestBody()).subscribe({
      next: data => {
        this.partyList = data;
      },
      error: error => {
        this.partyList = [];
      }
    });
  }
  /* request body for party list dropdown api call */
  public getPartyListRequestBody() {
    return {
      MethodName: "Search_PartyInfo"
    }
  }
  getCategoryList() {
    this._purchaseInfoService.getCategoryList(this.getCategoryListRequestBody()).subscribe({
      next: data => {
        this.categoryList = data;
      },
      error: error => {
        this.categoryList = [];
      }
    });
  }
  /* request body for category list dropdown api call */
  public getCategoryListRequestBody() {
    return {
      MethodName: "Search_BasicCategory"
    }
  }
  /* get product list to show dropwon */
  getProductList() {
    let CategoryID = this["CategoryID"];
    if (["", undefined, null].includes(CategoryID)) {
      return;
    }
    this._purchaseInfoService.getProductList(this.getProductListRequestBody(CategoryID)).subscribe({
      next: data => {
        this.productList = data;
      },
      error: error => {
        this.productList = [];
      }
    });
  }
  /* request body for product list dropdown api call */
  public getProductListRequestBody(CategoryID) {
    return {
      CategoryID: CategoryID,
      MethodName: "Sel_ProductInfo_ByID"
    }
  }

  /* get amp list to show dropwon */
  getAmpList() {
    this._saleInfoService.getAmpList(this.getAmpListRequestBody()).subscribe({
      next: data => {
        this.ampList = data;
      },
      error: error => {
        this.ampList = [];
      }
    });
  }
  /* request body for amp list dropdown api call */
  public getAmpListRequestBody() {
    return {
      MethodName: "Search_BasicAmp"
    }
  }
  showFilterCriteria(report) {
    this.hideAllFilterCriteria();
    this.activeReport = report;
    let filters = this.activeReport.filterCriteria?.replace(/,\s*$/, "")?.replace(/\s/g, "")?.split(',');
    filters.forEach(control => {
      this[control] = "";
      this[control + 'Control'] = true;

      if (control === 'PartyID') {
        this.getPartyList();
      }

      if (control === 'CategoryID') {
        this.getCategoryList();
      }

      if (control === 'AmpID') {
        this.getAmpList();
      }

    })
  }

  hideAllFilterCriteria() {
    this._sharedDataService.currentUser.menu.forEach(m => m.subMenu.forEach(sub => sub.filterCriteria?.replace(/,\s*$/, "")?.replace(/\s/g, "")?.split(',').forEach(control => {
      this[control] = "";
      this[control + 'Control'] = false
    })))
  }
  viewReport() {
    let queryString = "MethodName=" + this.activeReport.reportName;
    let filters = this.activeReport.filterCriteria?.replace(/,\s*$/, "")?.replace(/\s/g, "")?.split(',');
    filters.forEach(control => {

      if (['UserID', 'UserType'].includes(control)) {
        queryString = `${queryString}&${control}=${this._sharedDataService.currentUser?.[control == 'UserID' ? 'userID' : 'userType']}`
      }
      else if (![undefined, null, ""].includes(this[control])) {
        queryString = `${queryString}&${control}=${this[control]}`
      }
    });
    this._sharedDataService.openReportSlideIn.next(queryString);
  }

  ngOnDestroy(): void {
    this.CustomerTypes = Constant.CUSTOMER_TYPE;
  }
}
