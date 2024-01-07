import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";
import { OldBatteryInfoService } from "src/app/Services/OldBatteryInfo/old-battery-info.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Constant } from "src/app/config/constants";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";

@Component({
  selector: 'app-old-battery-info',
  templateUrl: './old-battery-info.component.html',
  styleUrls: ['./old-battery-info.component.css']
})
export class OldBatteryInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public oldBatteryList;
  public showLoader: boolean = false;
  OldBatteryInfoForm: FormGroup;
  public radioGroup = Constant.SALE_OR_PURCHASE_TYPE;
  public ampList: any;
  public isCustomerInfoSlideIn: boolean = false;
  public btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  public isAdd: boolean = true;
  public selectedCustomer: any;

  constructor(
    private _oldBatteryInfoService: OldBatteryInfoService,
    private _sharedDataService: SharedDataService,
    private _saleInfoService: SaleInfoService,
    private _FormBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.oldBatteryFormBuilder();
    this.getSelectedOrAdddedCustomer();
    this.formField = fields;
    this.getList();
    this.getAmpList();
  }
  oldBatteryFormBuilder() {
    this.OldBatteryInfoForm = this._FormBuilder.group({
      OldBatteryID: [""],
      CustomerID: ["", Validators.required],
      BillDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      SaleOrPurchase: ["P", Validators.required],
      AmpID: [""],
      TotalQuantity: ["", Validators.required],
      TotalAmount: ["", Validators.required],
      TotalWeight: [""],
      PurchasePrice: [""]
    });
  }
  /* This will trigger when add customer or select customer using subject */
  getSelectedOrAdddedCustomer() {
    this._sharedDataService.getSelectedCustomer.subscribe(res => {
      this.showCustomerModel(res);
    });
  }
  showCustomerModel(res) {
    this.selectedCustomer = res;
    this.OldBatteryInfoForm.get("CustomerID")?.setValue(res?.CustomerID);
    this.showCustomerInfoSlideIn(false);

    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
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

  Submit() {
    let Data = this.OldBatteryInfoForm.value;
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_OldBatteryInfo";
    Data.Mode = this.isAdd ? "0" : "1";
    this._oldBatteryInfoService.AddOldBattery(Data).subscribe({
      next: res => {
        this._sharedDataService.success("Old Battery saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        this.showLoader = false;
        this.clearField();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._oldBatteryInfoService.GetOldBattery(this.getRequestBody()).subscribe({
      next: data => {
        this.oldBatteryList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_OldBatteryInfo"
    }
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  getPurchasePrice() {
    const AmpID = this.OldBatteryInfoForm.get("AmpID")?.value;
    this.ampList?.forEach(amp => {
      if (amp?.AmpID == AmpID) {
        this.OldBatteryInfoForm.get("PurchasePrice")?.setValue(amp?.PurchasePrice);
      }
    })
  }

  /* clear purchase whole form on save or on clear */
  clearField() {
    this.OldBatteryInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.OldBatteryInfoForm.get("BillDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.OldBatteryInfoForm.get("SaleOrPurchase")?.setValue("P");
    this.OldBatteryInfoForm.get("AmpID")?.setValue("");
  }

  onPurchaeOrSaleChange() {
    const SaleOrPurchase = this.OldBatteryInfoForm.get("SaleOrPurchase")?.value;

    this.OldBatteryInfoForm.get(SaleOrPurchase === 'P' ? "TotalQuantity" : "TotalWeight")?.setValidators([Validators.required]);//setting validation
    this.OldBatteryInfoForm.get(SaleOrPurchase === 'P' ? "TotalQuantity" : "TotalWeight")?.setErrors({ 'required': true });//error message
    this.OldBatteryInfoForm.updateValueAndValidity();//update validation

    this.OldBatteryInfoForm.get(SaleOrPurchase != 'P' ? "TotalQuantity" : "TotalWeight")?.clearValidators();//clear validation
    this.OldBatteryInfoForm.get(SaleOrPurchase != 'P' ? "TotalQuantity" : "TotalWeight")?.setErrors(null);//updating error message
    this.OldBatteryInfoForm.updateValueAndValidity();//update validation
  }
  /* remove selected customer  */
  removeSelectedCustomer() {
    this.selectedCustomer = null;
    this.btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  }

  calculateTotal() {
    const SaleOrPurchase = this.OldBatteryInfoForm.get("SaleOrPurchase")?.value;
    if (SaleOrPurchase === 'P') {
      let price = this.OldBatteryInfoForm.get("PurchasePrice")?.value ?? 0;
      let Quanity = this.OldBatteryInfoForm.get("TotalQuantity")?.value ?? 0;
      let TotalAmount = price * Quanity;
      this.OldBatteryInfoForm.get("TotalAmount")?.setValue(TotalAmount);
    }
  }

  /* search list edit */
  edit(item) {
    this.OldBatteryInfoForm.patchValue(item);
    this.isAdd = false;
    this.btnChooseCustomerText = item?.CustomerName;
    setTimeout(() => {
      this.onPurchaeOrSaleChange();
      this.calculateTotal();
    }, 1000);
  }
  /* search list delete  */
  delete(item) {
    this.getList();
  }
}
