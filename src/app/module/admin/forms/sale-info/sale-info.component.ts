import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { generatePostRequestBody } from "./fields";
import { APPLICABLE_GST_TYPE, Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";

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
  public ampList: any;
  public paymentModeList: any;
  @ViewChild("scanControl") scanControl: ElementRef;
  public basicGST: any;
  public withOrWithoutGST = Constant.WITH_OR_WITHOUT_GST;

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

    this.getAmpList();
    this.getPaymentModeList();
    this.getGST();
  }
  SaleInfoFormBuilder() {
    this.SaleInfoForm = this._FormBuilder.group({
      SaleID: [""],
      CustomerID: ["", Validators.required],
      BillDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      BillNo: [{ value: "", disabled: true }, Validators.required],
      TotalQuantity: [{ value: 0, disabled: true }],
      TotalAmount: [{ value: 0, disabled: true }],
      OldBatteryPurchasePrice: [0],
      OldBatteryCount: [1],
      TotalOldBatteryAmount: [{ value: 0, disabled: true }],
      FinalAmount: [{ value: 0, disabled: true }],
      DiscountAmount: [0],
      TotalPaidAmount: [""],
      PendingAmount: [{ value: 0, disabled: true }],
      IsSaleReturn: [0],
      SaleProductInfo: this._FormBuilder.group(
        {
          SerialNo: [""],
          SalePrice: []
        }
      ),
      SaleProductList: [[], Validators.required],
      Print: [false],
      AmpID: [""],
      PaymentModeID: ["", Validators.required],
      Remark: [""],
      GSTMode: ["", Validators.required],
      CGST: [""],
      CGSTAmount: [{ value: 0, disabled: true }],
      SGST: [""],
      SGSTAmount: [{ value: 0, disabled: true }],
      IGST: [""],
      IGSTAmount: [{ value: 0, disabled: true }],
      ApplicableGSTType: [APPLICABLE_GST_TYPE.C]
    });
  }
  getGST() {
    this._sharedDataService.getGST(this.getGSTRequestBody()).subscribe({
      next: data => {
        this.basicGST = data?.[0];
        this.SaleInfoForm.patchValue({
          GSTMode: this.basicGST?.GSTMode,
          CGST: this.basicGST?.CGST,
          SGST: this.basicGST?.SGST,
          IGST: this.basicGST?.IGST
        });
      },
      error: error => {
      }
    });
  }

  getGSTRequestBody() {
    return {
      MethodName: "Search_BasicGST",
      GSTType: 'S'
    }
  }
  /* get payment mode list to show dropwon */
  getPaymentModeList() {
    this._saleInfoService.getPaymentModeList(this.getPaymentModeListRequestBody()).subscribe({
      next: data => {
        this.paymentModeList = data;
      },
      error: error => {
        this.paymentModeList = [];
      }
    });
  }
  /* request body for payment mode list dropdown api call */
  public getPaymentModeListRequestBody() {
    return {
      MethodName: "Search_BasicPaymentMode"
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
  /* This will trigger when add customer or select customer using subject */
  getSelectedOrAdddedCustomer() {
    this._sharedDataService.getSelectedCustomer.subscribe(res => {
      this.showCustomerModel(res);

      if (!["", undefined, null].includes(res?.GSTNo)) {
        const StateCode = res?.GSTNo?.substring(0, 2);
        this.SaleInfoForm.get("ApplicableGSTType")?.setValue(
          StateCode === this.basicGST.StateCode ? APPLICABLE_GST_TYPE.C : APPLICABLE_GST_TYPE.I
        );
        this.onWithOrWithoutGSTChange();
        this.updateTotalValues();
      }
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
  getProductDetailBySerialNo(SerialNo) {
    //let SerialNo = this.SaleInfoForm.get("SaleProductInfo")?.value?.SerialNo;
    if (["", undefined, null].includes(SerialNo)) {
      return;
    }

    this._saleInfoService.getSerialNoDetail(this.getSerialNoDetailRequestBody(SerialNo)).subscribe({
      next: data => {
        let SaleProductList: [any] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
        SaleProductList.push(data?.[0]);
        this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
        this.SaleInfoForm.get("AmpID")?.setValue(data?.[0]?.AmpID);
        this.SaleInfoForm.get("OldBatteryPurchasePrice")?.setValue(data?.[0]?.PurchasePrice);

        this.getSalePriceByCusomerTypeID();
        this.updateTotalValues();
        this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
        this.updateTotalValues();
      },
      error: error => {
        this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
        this._sharedDataService.NotieError(error.error);
        document?.getElementById("id_SerialNo")?.focus();
      }
    });
  }

  /* This will create array based on Serial no input string, in which you have comma seperated serial no */
  separateSerialNo() {
    let serialNo = this.SaleInfoForm.get("SaleProductInfo")?.value?.SerialNo;
    if (["", undefined, null].includes(serialNo)) {
      return;
    }
    const separateByComma = serialNo?.replace(/,\s*$/, "")?.replace(/\s/g, "")?.split(',');
    if (separateByComma?.length > 0) {
      separateByComma.forEach(serial => {
        this.getProductDetailBySerialNo(serial);
      })
    }
    if (separateByComma?.length > 0) {
      this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
      this.scanControl.nativeElement.focus();
    }
  }
  /* request body for Serial no api call */
  public getSerialNoDetailRequestBody(SerialNo) {
    return {
      MethodName: "Sel_PurchaseProductInfo_BySerialNo",
      SerialNo: SerialNo,
      SaleID: this.SaleInfoForm.get("SaleID")?.value ?? ""
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
  Submit() {
    this.showLoader = true;
    this._saleInfoService.AddSale(generatePostRequestBody(this.SaleInfoForm.getRawValue(), this.isAdd ? "0" : "1")).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Completed successfully !");
        this.printSaleInvoice(data)
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
    let OldBatteryPurchasePrice = 0;
    let DiscountAmount = 0;
    let CGST = 0;
    let CGSTAmount = 0;
    let SGST = 0;
    let SGSTAmount = 0;
    let IGST = 0;
    let IGSTAmount = 0;

    TotalQuantity = SaleProductList.length;
    TotalAmount = SaleProductList?.reduce((n, { SalePrice }) => (n) + parseFloat(SalePrice), 0);
    OldBatteryPurchasePrice = this.SaleInfoForm.get("OldBatteryPurchasePrice")?.value || 0;
    OldBatteryCount = this.SaleInfoForm.get("OldBatteryCount")?.value || 0;
    TotalOldBatteryAmount = (OldBatteryCount ?? 0) * (OldBatteryPurchasePrice ?? 0);
    DiscountAmount = this.SaleInfoForm.get("DiscountAmount")?.value || 0;
    FinalAmount = TotalAmount - DiscountAmount - TotalOldBatteryAmount;
    TotalPaidAmount = this.SaleInfoForm.get("TotalPaidAmount")?.value || 0;
    TotalPaidAmount = (TotalPaidAmount <= FinalAmount) && (this.SaleInfoForm.get("TotalPaidAmount")?.dirty) ? TotalPaidAmount : FinalAmount;
    PendingAmount = FinalAmount - TotalPaidAmount;

    if (this.SaleInfoForm.get("GSTMode")?.value === "G" && this.SaleInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.C) {
      CGST = this.SaleInfoForm.get("CGST")?.value || 0;
      SGST = this.SaleInfoForm.get("SGST")?.value || 0;
      CGSTAmount = ((TotalAmount * CGST) / 100);
      SGSTAmount = ((TotalAmount * SGST) / 100);
    }
    else if (this.SaleInfoForm.get("GSTMode")?.value === "G" && this.SaleInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.I) {
      IGST = this.SaleInfoForm.get("IGST")?.value || 0;
      IGSTAmount = ((TotalAmount * IGST) / 100);
    }

    this.SaleInfoForm.patchValue({
      TotalQuantity: TotalQuantity,
      TotalAmount: TotalAmount,
      FinalAmount: FinalAmount,
      PendingAmount: PendingAmount,
      TotalPaidAmount: TotalPaidAmount,
      TotalOldBatteryAmount: TotalOldBatteryAmount,
      DiscountAmount: DiscountAmount,
      CGSTAmount: CGSTAmount,
      SGSTAmount: SGSTAmount,
      IGSTAmount: IGSTAmount,
      CGST: CGST,
      SGST: SGST,
      IGST: IGST
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
    this.SaleInfoForm.get("OldBatteryCount")?.setValue("1");
    this.SaleInfoForm.get("GSTMode")?.setValue(this.basicGST?.GSTMode);
    this.SaleInfoForm.get("ApplicableGSTType")?.setValue(APPLICABLE_GST_TYPE.C);
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    this._sharedDataService.saleInfoEdit.subscribe(item => {
      this.getAmpList();
      this.getPaymentModeList();
      this.showCustomerModel(item?.CustomerInfo);
      setTimeout(() => {
        this.SaleInfoForm.patchValue(item);

        this.isAdd = false;
        this.SaleInfoForm.get("CustomerID")?.setValue(item?.CustomerInfo?.CustomerID);
        this.SaleInfoForm.get("SaleProductList")?.setValue(item?.SaleProductInfo ?? []);
        this.updateTotalValues();
      }, 1000);

    });
  }

  /* print recently submited purchase */

  printSaleInvoice(data) {
    if (this.SaleInfoForm.get("Print")?.value) {
      this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_SaleInfo&SaleID=" + data?.[0]?.SaleID);
    }
  }
  onWithOrWithoutGSTChange() {
    const GSTMode = this.SaleInfoForm.get("GSTMode")?.value;
    if (GSTMode === 'W') {
      this.SaleInfoForm.patchValue({
        CGST: "",
        CGSTAmount: "0",
        SGST: "",
        SGSTAmount: "0",
        IGST: "",
        IGSTAmount: "0"
      });
    }
    else {
      this.SaleInfoForm.patchValue({
        CGST: this.basicGST?.CGST,
        CGSTAmount: "0",
        SGST: this.basicGST?.SGST,
        SGSTAmount: "0",
        IGST: this.basicGST?.IGST,
        IGSTAmount: "0"
      });

      this.updateTotalValues();
    }
  }
}