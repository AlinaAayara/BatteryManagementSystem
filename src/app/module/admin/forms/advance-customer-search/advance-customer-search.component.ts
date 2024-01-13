import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";
import { ActivatedRoute } from "@angular/router";
import { Constant } from "src/app/config/constants";
import { AdvanceSerachPurchaseInfo } from "src/app/core/models/advance-serach-purchase-info";
import { AdvanceSerachSaleInfo } from "src/app/core/models/advance-search-sale-info";
import { AdvanceSearchWarrantyInfo } from "src/app/core/models/advance-search-warranty-info";

@Component({
  selector: "app-advance-customer-search",
  templateUrl: "./advance-customer-search.component.html",
  styleUrls: ["./advance-customer-search.component.css"]
})
export class AdvanceCustomerSearchComponent implements OnInit, OnChanges {
  public AdvanceList;
  public showLoader: boolean = false;
  public CustomerName = "";
  public subMenuID;
  public isWrite: boolean = false;
  public isDelete: boolean = false;
  Object = Object;
  public CustomerTypes = Constant.CUSTOMER_TYPE;
  public CustomerTypeID = "";
  @Output() public emitCustomer = new EventEmitter();
  public activeTab: any = null;
  public ActivePurchaseInfoList: AdvanceSerachPurchaseInfo[];
  public ActiveSaleInfoList: AdvanceSerachSaleInfo[];
  public ActiveWarrantyInfoList: AdvanceSearchWarrantyInfo[];
  @Input() public AdvanceSearchTextString;
  @Output() public closeSlideInPopup = new EventEmitter();
  @Input() IsAccessedFromFormPage = false;

  constructor(
    private route: ActivatedRoute,
    private _customerInfoService: CustomerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["AdvanceSearchTextString"]) {
      this.CustomerName = changes["AdvanceSearchTextString"]?.currentValue;
      if (this.CustomerName?.length > 0) {
        setTimeout(() => {
          this.serchCustomer();
        }, 1000);

      }
    }


  }
  ngOnInit(): void {
    this.subMenuID = this.route.snapshot.queryParamMap.get("id");
    /* if we use advance search for warranty form(8) then it that we should show sale tab active (7). So that we can choose which battery we want to replace*/
    //this.id = (["8", "9"].includes(this.id) && this.IsAccessedFromFormPage) ? "7" : this.id;
    this.setActiveTab();
  }

  setActiveTab() {
    this.activeTab =
      !["", null, undefined].includes(this.subMenuID) ?
        this._sharedDataService.getCurrentActiveForm(this.subMenuID)
        : null;

    this.activeTab = Constant.ADVANCE_SEARCH_TAB.includes(this.activeTab?.subMenuURL) ? this.activeTab : null;
    this.isWrite = this.activeTab?.isWrite;
    this.isDelete = this.activeTab?.isDelete;
  }

  serchCustomer() {
    const subMenuURL = this?.activeTab?.subMenuURL;
    // /* SubMenu ID condition is used here bcoz if we access this component in sales retunr , then it will not show already return sale product */
    // const SubMenuID = this.route.snapshot.queryParamMap.get("id");
    // const IsSaleReturn = (SubMenuID == "9" && this.IsAccessedFromFormPage) ? "0" : "";
    // //--===========================================================================--

    const obj = this._sharedDataService.requestBodyForAdvanceSearch(subMenuURL, this.CustomerName, this.CustomerTypeID, "");
    this._sharedDataService.advacneSearchPOST(obj?.Url, obj?.requestBody).subscribe({
      next: data => {
        this.setTabData(data);
      },
      error: error => {
        this._sharedDataService.error(error)
      }
    });
  }

  setTabData(data) {
    const subMenuURL = this?.activeTab?.subMenuURL;
    switch (subMenuURL) {
      case "PurchaseInfo":
        this.ActivePurchaseInfoList = new Array<AdvanceSerachPurchaseInfo>();
        data.forEach(item => {
          this.ActivePurchaseInfoList.push(new AdvanceSerachPurchaseInfo(item));
        }); 7
        break;
      case "SaleInfo":
        this.ActiveSaleInfoList = new Array<AdvanceSerachSaleInfo>();
        data.forEach(item => {
          this.ActiveSaleInfoList.push(new AdvanceSerachSaleInfo(item));
        });
        break;
      case "WarrantyInfo":
        this.ActiveWarrantyInfoList = new Array<AdvanceSearchWarrantyInfo>();
        data.forEach(item => {
          this.ActiveWarrantyInfoList.push(new AdvanceSearchWarrantyInfo(item));
        });
        break;
    }
  }

  deleteItem(id) {
    this._sharedDataService.SwalConfirmDeleteForAdvanceSearch(this.deleteBody(id));
  }

  editItem(item) {
    this._sharedDataService.customerInfoEdit.next(item);
  }

  /* delete request body */
  deleteBody(id) {
    return {
      SubMenuID: this.subMenuID,
      PrimaryValue: id,
      MethodName: "deleteRecord"
    }
  }
  /* manually remove item from search result */
  removeItem(id) {
    this.AdvanceList = this.AdvanceList.filter((searchid) => { Object.values(searchid)[0] != id });
  }

  /* This will trigger on customer card selection */
  selectedCustomer(customer) {
    this.emitCustomer.emit(customer);
  }

  closeSlideIn(isclose) {
    this.closeSlideInPopup.emit(isclose);
  }
}
