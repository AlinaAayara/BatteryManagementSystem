import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { generatePostRequestBody } from "./fields";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";

@Component({
  selector: 'app-sale-info',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.css']
})
export class SaleInfoComponent implements OnInit {
  SaleInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public selectedCustomer: any;
  public btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.SaleInfoFormBuilder();
    this.getSelectedOrAdddedCustomer();

    this.getBillNo();
    this.edit();
  }
  SaleInfoFormBuilder() {
    this.SaleInfoForm = this._FormBuilder.group({
      SaleID: [""],
      CustomerID: ["", Validators.required],
      BillDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      BillNo: ["", Validators.required],
      TotalQuantity: [0],
      TotalAmount: [0],
      OldBatteryCount: [""],
      TotalOldBatteryAmount: [""],
      FinalAmount: [0],
      TotalPaidAmount: [""],
      PendingAmount: [0],
      IsSaleReturn: [0],
      SaleProductInfo: this._FormBuilder.group(
        {
          SerialNo: [""],
          SalePrice: []
        }
      ),
      SaleProductList: [[], Validators.required]
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
    this.SaleInfoForm.get("CustomerID")?.setValue(res?.CustomerID);
    this.showCustomerInfoSlideIn(false);

    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
    this.getSalePriceByCusomerTypeID();
  }

  /* function to get Max bill no+1 
  1) Initial Load
  2) After Submit */
  getBillNo() {
    this._saleInfoService.GetBillNo(this.getBillNoRequestBody()).subscribe({
      next: data => {
        this.SaleInfoForm.get("BillNo")?.setValue(data?.[0]?.BillNo);
      },
      error: error => {
        this.showLoader = false;
      }
    });
  }

  /* request body get Bill No api call */
  public getBillNoRequestBody() {
    return {
      MethodName: "Sel_Next_SaleNo"
    }
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  /* after scan of  serial no  this will get all product related details from database base on entered SERIAL NO*/
  getProductDetailBySerialNo() {
    let SerialNo = this.SaleInfoForm.get("SaleProductInfo")?.value?.SerialNo;
    if (["", undefined, null].includes(SerialNo)) {
      return;
    }

    this._saleInfoService.getSerialNoDetail(this.getSerialNoDetailRequestBody(SerialNo)).subscribe({
      next: data => {
        let SaleProductList: [any] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
        SaleProductList.push(data?.[0]);
        this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
        this.getSalePriceByCusomerTypeID();
        this.updateTotalValues();
        this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
      },
      error: error => {
        this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
        this._sharedDataService.NotieError(error.error);
        document?.getElementById("id_SerialNo")?.focus();
      }
    });
  }
  /* request body for Serial no api call */
  public getSerialNoDetailRequestBody(SerialNo) {
    return {
      MethodName: "Sel_PurchaseProductInfo_BySerialNo",
      SerialNo: SerialNo,
      SaleID : this.SaleInfoForm.get("SaleID")?.value ?? ""
    }
  }

  /* set sale price depend upon product + customer type
  1) On selection of customer
  2) On entered serial no 
   */

  getSalePriceByCusomerTypeID() {
    let SaleProductList: [any] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    if (SaleProductList?.length > 0 && this.selectedCustomer?.CustomerTypeID) {
      const CustomerTypeID = CustomerTypeID_ToPurchaseProduct[this.selectedCustomer?.CustomerTypeID];

      SaleProductList.forEach(prod => {
        prod.SalePrice = prod[CustomerTypeID]
      });

      this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
    }
  }

  /* remove selected customer  */
  removeSelectedCustomer() {
    this.selectedCustomer = null;
    this.btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    this._saleInfoService.AddSale(generatePostRequestBody(this.SaleInfoForm.value, this.isAdd ? "0" : "1")).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Completed successfully !");
        this.clearSale();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });

  }


  /* update sale total values like totalAmount, Total Quanity etc. 
  1) on product addition , deletion  
  2) on Paid Amount change 
  3) old battery amount change*/
  updateTotalValues() {
    let TotalQuantity = 0;
    let TotalAmount = 0;
    let TotalPaidAmount = 0;
    let FinalAmount = 0;
    let PendingAmount = 0;
    let SaleProductList: [any] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    let OldBatteryCount = 0
    let TotalOldBatteryAmount = 0;

    TotalQuantity = SaleProductList.length;
    TotalAmount = SaleProductList?.reduce((n, { SalePrice }) => (n) + parseFloat(SalePrice), 0);
    TotalOldBatteryAmount = this.SaleInfoForm.get("TotalOldBatteryAmount")?.value || 0;
    FinalAmount = TotalAmount - TotalOldBatteryAmount;
    TotalPaidAmount = this.SaleInfoForm.get("TotalPaidAmount")?.value || 0;
    PendingAmount = FinalAmount - TotalPaidAmount;

    this.SaleInfoForm.patchValue({
      TotalQuantity: TotalQuantity,
      TotalAmount: TotalAmount,
      FinalAmount: FinalAmount,
      PendingAmount: PendingAmount,
      TotalPaidAmount: TotalPaidAmount
    })

  }

  /* remove item from list it will trigger from front end purchase product table upon click on delete button */
  removeSaleProduct(item) {
    let SaleProductList: any[] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    SaleProductList = SaleProductList?.filter((itm) => item != itm);
    this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
    this.updateTotalValues();
  }


  /* clear purchase whole form on save or on clear */
  clearSale() {
    this.SaleInfoForm.reset();
    this.removeSelectedCustomer();
    this.isAdd = true;
    this.showLoader = false;
    this.SaleInfoForm.get("BillDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.getBillNo();
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    this._sharedDataService.saleInfoEdit.subscribe(item => {
      this.showCustomerModel(item?.CustomerInfo);
      this.SaleInfoForm.patchValue(item);

      this.isAdd = false;
      this.SaleInfoForm.get("CustomerID")?.setValue(item?.CustomerInfo?.CustomerID);
      this.SaleInfoForm.get("SaleProductList")?.setValue(item?.SaleProductInfo ?? []);
      this.updateTotalValues();
    });
  }
}
