import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { PurchaseInfoService } from "src/app/Services/PurchaseInfo/purchase-info.service";
import { PurchaseReturnInfoService } from "src/app/Services/PurchaseReturnInfo/purchase-return-info.service";


@Component({
  selector: 'app-purchase-return-info-common',
  templateUrl: './purchase-return-info-common.component.html',
  styleUrls: ['./purchase-return-info-common.component.css']
})
export class PurchaseReturnInfoCommonComponent implements OnInit {
  PurchaseReturnInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public SerialNoList: any[];
  public FromDate: string;
  public ToDate: string;
  public CategoryID: string = "";
  public ProductID: string = "";
  public categoryList: any;
  public productList: any;

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _PurchaseReturnInfoService: PurchaseReturnInfoService,
    private _sharedDataService: SharedDataService,
    private _purchaseInfoService: PurchaseInfoService
  ) {

  }
  ngOnInit(): void {
    this.PurchaseReturnInfoFormBuilder();
    this.edit();
    this.getCategoryList();
    //this.ToDate = this.FromDate = this._sharedDataService?.currentUser?.todaysDate;

  }
  PurchaseReturnInfoFormBuilder() {
    this.PurchaseReturnInfoForm = this._FormBuilder.group({
      PurchaseReturnDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      PurchaseProductReturnInfoList: [[], Validators.required]
    });
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
  /* This will trigger when select already sold item using subject */
  getPurchaseReturnSerialNo() {
    let obj = {
      FromDate: this.FromDate,
      ToDate: this.ToDate,
      ProductID: this.ProductID,
      CategoryID: this.CategoryID,
      MethodName: "Sel_PurchaseReturnSerialNo"
    }
    this._PurchaseReturnInfoService.getPurchaseReturnSerialNo(obj).subscribe({
      next: data => {
        this.showLoader = false;
        this.SerialNoList = data;
        //this.setCheckedReturnList();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  checkElement(e, i) {
    console.log("e", e);
    //this.SerialNoList[i].Checked = e?.target?.checked;
    //console.log("this.SerialNoList", this.SerialNoList);
    this.setCheckedReturnList(i, e?.target?.checked);
  }
  setCheckedReturnList(index, isChecked) {
    let serialNoData = this.SerialNoList[index];
    let PurchaseProductReturnInfoList: any = this.PurchaseReturnInfoForm.get("PurchaseProductReturnInfoList")?.value ?? [];
    if (isChecked) {
      PurchaseProductReturnInfoList.push({
        ProductID: serialNoData?.ProductID,
        SerialNo: serialNoData?.SerialNo,
        Price: serialNoData?.Price
      })
    }
    else {
      PurchaseProductReturnInfoList = PurchaseProductReturnInfoList.filter(p => p.SerialNo != serialNoData?.SerialNo);
    }

    console.log("PurchaseProductReturnInfoList", PurchaseProductReturnInfoList);
    this.PurchaseReturnInfoForm.get("PurchaseProductReturnInfoList")?.setValue(PurchaseProductReturnInfoList);
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    let Data = this.PurchaseReturnInfoForm.value;
    Data.MethodName = "InUp_PurchaseReturnInfo";
    Data.Mode = "0";
    this._PurchaseReturnInfoService.AddPurchaseReturn(Data).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Return Completed successfully !");
        this.clearSaleReturn();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }


  /* clear purchase whole form on save or on clear */
  clearSaleReturn() {
    this.PurchaseReturnInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    //this.ToDate = this.FromDate = this._sharedDataService?.currentUser?.todaysDate;
    this.PurchaseReturnInfoForm.get("PurchaseReturnDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.SerialNoList = [];
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    // this._sharedDataService.warrantyInfoEdit.subscribe(item => {
    //   this.showCustomerModel(item);
    //   this.showSaleModel(item);
    //   this.PurchaseReturnInfoForm.patchValue(item);
    //   this.isAdd = false;
    // });
  }
}
