import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";
import { SaleProductInfo } from "src/app/core/models/advance-search-sale-info";
import { WarrantyInfoService } from "src/app/Services/WarrantyInfo/warranty-info.service";
import { SaleReturnInfoService } from "src/app/Services/SaleReturnInfo/sale-return-info.service";


@Component({
  selector: 'app-sale-return-info',
  templateUrl: './sale-return-info.component.html',
  styleUrls: ['./sale-return-info.component.css']
})
export class SaleReturnInfoComponent implements OnInit {
  SaleReturnInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public selectedCustomer: any;
  public btnChooseCustomerText = Constant.CHOOSE_SOLD_PRODUCT;
  public SaleProductInfo: SaleProductInfo[];

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _saleReturnInfoService: SaleReturnInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.SaleReturnInfoFormBuilder();
    this.getSaleInfo();
    this.edit();
  }
  SaleReturnInfoFormBuilder() {
    this.SaleReturnInfoForm = this._FormBuilder.group({
      CustomerID: ["", Validators.required],
      SaleReturnDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      SaleID: ["", Validators.required],
      IsSaleReturn: ["1", Validators.required],
      ReturnRemark: [""]
    });
  }

  /* This will trigger when select already sold item using subject */
  getSaleInfo() {
    this._sharedDataService.saleInfoEdit.subscribe(res => {
      this.showCustomerModel(res);
      this.showSaleModel(res);
    });
  }

  showCustomerModel(res) {
    this.selectedCustomer = res.CustomerInfo;
    this.SaleReturnInfoForm.get("CustomerID")?.setValue(res.CustomerInfo?.CustomerID);
    this.showCustomerInfoSlideIn(false);
    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
  }
  showSaleModel(res) {
    this.SaleReturnInfoForm.get("SaleID")?.setValue(res?.SaleID);
    this.SaleReturnInfoForm.get("SaleProductID")?.setValue(res?.SaleProductInfo?.[0]?.SaleProductID);
    this.SaleReturnInfoForm.get("OldSerialNo")?.setValue(res?.SaleProductInfo?.[0]?.SerialNo);
    this.SaleProductInfo = res?.SaleProductInfo ?? [];
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    let Data = this.SaleReturnInfoForm.value;
    Data.MethodName = "InUp_SaleInfo";
    Data.Mode = "4";
    delete (Data.SaleProductList);
    this._saleReturnInfoService.SaleReturn(Data).subscribe({
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
    this.SaleReturnInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.SaleReturnInfoForm.get("SaleReturnDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.SaleProductInfo = [];
    this.selectedCustomer = {}
    this.btnChooseCustomerText = Constant.CHOOSE_SOLD_PRODUCT;
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    this._sharedDataService.warrantyInfoEdit.subscribe(item => {
      this.showCustomerModel(item);
      this.showSaleModel(item);
      this.SaleReturnInfoForm.patchValue(item);
      this.isAdd = false;
    });
  }
}
