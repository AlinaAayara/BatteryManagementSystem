import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { generatePostRequestBody } from "./fields";
import { APPLICABLE_GST_TYPE, Constant, CustomerTypeID_ToPurchaseProduct, USER_TYPES } from "src/app/config/constants";

@Component({
  selector: 'app-sale-info-common',
  templateUrl: './sale-info-common.component.html',
  styleUrls: ['./sale-info-common.component.css']
})
export class SaleInfoCommonComponent implements OnInit, OnChanges {
  SaleInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public selectedCustomer: any;
  @Input() public btnChooseText;
  public btnChooseCustomerText;
  public ampList: any;
  public paymentModeList: any;
  @ViewChild("scanControl") scanControl: ElementRef;
  public basicGST: any;
  public withOrWithoutGST = Constant.WITH_OR_WITHOUT_GST;
  @Input() public userType;

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['userType']) {
      this.userType = changes['userType']?.currentValue;
    }
    if (changes?.['btnChooseText']) {
      this.btnChooseText = changes['btnChooseText']?.currentValue;
      this.btnChooseCustomerText = this.btnChooseText;
    }
  }
  ngOnInit(): void {
    this.SaleInfoFormBuilder();
    this.getSelectedOrAdddedCustomer();
    this.getSelectedOrAdddedDistributor();
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
          SalePrice: [],
          CGST: [""],
          CGSTAmount: [{ value: "", disabled: true }],
          SGST: [""],
          SGSTAmount: [{ value: "", disabled: true }],
          IGST: [""],
          IGSTAmount: [{ value: "", disabled: true }]
        }
      ),
      SaleProductList: [[], Validators.required],
      Print: [false],
      AmpID: [""],
      PaymentModeID: ["", Validators.required],
      Remark: [""],
      GSTMode: ["", Validators.required],
      CGSTAmount: [{ value: 0, disabled: true }],
      SGSTAmount: [{ value: 0, disabled: true }],
      IGSTAmount: [{ value: 0, disabled: true }],
      TotalTaxableAmount: [{ value: 0, disabled: true }],
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
  /* This will trigger when add customer or select customer using subject */
  getSelectedOrAdddedDistributor() {
    this._sharedDataService.getSelectedDistributor.subscribe(res => {
      this.showDistributorModel(res);

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
  showDistributorModel(res) {
    this.selectedCustomer = res;
    this.SaleInfoForm.get("CustomerID")?.setValue(res?.UserID ?? res?.CustomerID);
    this.showCustomerInfoSlideIn(false);
    this.selectedCustomer.Name = this.selectedCustomer?.Name ?? this.selectedCustomer?.CustomerName;
    this.btnChooseCustomerText = this.selectedCustomer?.Name ?? this.selectedCustomer?.CustomerName;
    this.getSalePriceByCusomerTypeID(null);
  }

  showCustomerModel(res) {
    this.selectedCustomer = res;
    this.SaleInfoForm.get("CustomerID")?.setValue(res?.CustomerID);
    this.showCustomerInfoSlideIn(false);

    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
    this.getSalePriceByCusomerTypeID(null);
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
        let SaleProductList: any = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
        const isExists = SaleProductList.filter(p => p.ProductID == data?.[0]?.ProductID);
        if (isExists.length == 0) {
          data[0].SerialNoList = new Array();
          data?.[0]?.SerialNoList.push(data?.[0]?.SerialNo);
          data[0].Quantity = data?.[0]?.SerialNoList?.length;
          SaleProductList.push(data?.[0]);
        }
        else {
          isExists?.[0]?.SerialNoList.push(data?.[0]?.SerialNo);
          SaleProductList = SaleProductList.filter(p => p.ProductID != isExists?.[0]?.ProductID);
          isExists[0].Quantity = isExists?.[0]?.SerialNoList?.length;
          SaleProductList.push(isExists?.[0]);
        }

        this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
        this.SaleInfoForm.get("AmpID")?.setValue(data?.[0]?.AmpID);
        this.SaleInfoForm.get("OldBatteryPurchasePrice")?.setValue(data?.[0]?.OldBatteryPurchasePrice);
        this.getSalePriceByCusomerTypeID(SerialNo);
        this.calculateGST();
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

  /* This will create array based on Serial no input string, in which you have comma seperated serial no */
  separateSerialNo() {
    let serialNo = this.SaleInfoForm.get("SaleProductInfo")?.value?.SerialNo;
    let CustomerID = this.SaleInfoForm.get("CustomerID")?.value;
    if (["", undefined, null].includes(serialNo)) {
      return;
    }
    if (["", undefined, null].includes(CustomerID)) {
      this.SaleInfoForm.get("SaleProductInfo")?.get("SerialNo")?.setValue("");
      this._sharedDataService.NotieError("Please choose customer");
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

  getSalePriceByCusomerTypeID(SerialNo) {
    let SaleProductList: [any] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    if (SaleProductList?.length > 0 && !["",undefined,null].includes(this.selectedCustomer?.CustomerTypeID)) {
      const CustomerTypeID = CustomerTypeID_ToPurchaseProduct[this.selectedCustomer?.CustomerTypeID];
      SaleProductList.forEach(prod => {
        prod.SalePrice = SerialNo == prod.SerialNo ? prod[CustomerTypeID] : [null, undefined, ""].includes(SerialNo) ? prod[CustomerTypeID] : prod.SalePrice;
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
    let TotalTaxableAmount = 0;
    let CGSTAmount = 0;
    let SGSTAmount = 0;
    let IGSTAmount = 0;

    TotalQuantity = Number((SaleProductList?.reduce((n, { Quantity }) => (n) + parseInt(Quantity), 0)).toFixed(2));
    TotalAmount = Number((SaleProductList?.reduce((n, { TotalAmount }) => (n) + parseFloat(TotalAmount), 0)).toFixed(2));
    CGSTAmount = Number((SaleProductList?.reduce((n, { TotalCGSTAmount }) => (n) + parseFloat(TotalCGSTAmount), 0)).toFixed(2));
    SGSTAmount = Number((SaleProductList?.reduce((n, { TotalSGSTAmount }) => (n) + parseFloat(TotalSGSTAmount), 0)).toFixed(2));
    IGSTAmount = Number((SaleProductList?.reduce((n, { TotalIGSTAmount }) => (n) + parseFloat(TotalIGSTAmount), 0)).toFixed(2));

    TotalTaxableAmount = Number((SaleProductList?.reduce((n, { TotalGSTAmount }) => (n) + parseFloat(TotalGSTAmount), 0)).toFixed(2));
    OldBatteryPurchasePrice = this.SaleInfoForm.get("OldBatteryPurchasePrice")?.value || 0;
    OldBatteryCount = this.SaleInfoForm.get("OldBatteryCount")?.value || 0;
    TotalOldBatteryAmount = Number(((OldBatteryCount ?? 0) * (OldBatteryPurchasePrice ?? 0)).toFixed(2));
    DiscountAmount = Number((SaleProductList?.reduce((n, { TotalDiscountAmount }) => (n) + parseFloat(TotalDiscountAmount), 0)).toFixed(2));
    FinalAmount = Number((TotalAmount - TotalOldBatteryAmount).toFixed(2));
    TotalPaidAmount = this.SaleInfoForm.get("TotalPaidAmount")?.value || 0;
    TotalPaidAmount = (TotalPaidAmount <= FinalAmount) && (this.SaleInfoForm.get("TotalPaidAmount")?.dirty) ? TotalPaidAmount : FinalAmount;
    PendingAmount = FinalAmount - TotalPaidAmount;

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
      TotalTaxableAmount: TotalTaxableAmount
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

      switch (this.userType) {
        case USER_TYPES.Dealer:
          this.showCustomerModel(item?.CustomerInfo);
          break;
        case USER_TYPES.Manufacturer:
          this.showDistributorModel(item?.CustomerInfo);
          break;
      }

      this.showCustomerModel(item?.CustomerInfo);
      let saleProductList: any = [];
      setTimeout(() => {
        this.SaleInfoForm.patchValue(item);


        let SerialNo: any = [];

        item?.SaleProductInfo?.forEach(prod => {
          item?.SaleProductInfo?.forEach(serial => {
            if (prod.ProductID == serial.ProductID && !SerialNo.includes(serial.SerialNo)) {
              SerialNo.push(serial.SerialNo);
            }
          });
          prod.Quantity = SerialNo?.length;
          prod.SerialNoList = SerialNo;
          prod.SerialNo = SerialNo?.join(",");
          SerialNo = [];
        });


        item?.SaleProductInfo.forEach(prod => {
          const isExists = saleProductList.filter(p => p.ProductID === prod.ProductID);
          if (isExists.length == 0) {
            prod.Price = prod.SalePrice;
            prod.TotalAmount = Number((prod.Price * prod.Quantity).toFixed(2));
            prod.SalePrice = parseFloat(prod.Price) + (parseFloat(prod.CGSTAmount ?? 0) + parseFloat(prod.SGSTAmount ?? 0) + parseFloat(prod.IGSTAmount ?? 0)) + parseFloat(prod.DiscountAmount ?? 0);
            prod.TotalGSTAmount = Number(((parseFloat(prod.CGSTAmount ?? 0) + parseFloat(prod.SGSTAmount ?? 0) + parseFloat(prod.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
            prod.TotalDiscountAmount = Number((parseFloat(prod.DiscountAmount ?? 0) * prod.Quantity).toFixed(2));
            prod.TotalCGSTAmount = Number((((prod.CGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
            prod.TotalSGSTAmount = Number((((prod.SGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
            prod.TotalIGSTAmount = Number((((prod.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
            saleProductList.push(prod);
          }
        })
        this.isAdd = false;
        this.SaleInfoForm.get("CustomerID")?.setValue(item?.CustomerInfo?.CustomerID);
        this.SaleInfoForm.get("SaleProductList")?.setValue(saleProductList ?? []);
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
    this.calculateGST();
  }
  calculateGST() {
    const GSTMode = this.SaleInfoForm.get("GSTMode")?.value;
    const ApplicableGSTType = this.SaleInfoForm.get("ApplicableGSTType")?.value;
    let SaleProductList: any[] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];

    if (GSTMode === 'W') {
      SaleProductList?.forEach(product => {
        product.CGSTAmount = "0";
        product.SGSTAmount = "0";
        product.IGSTAmount = "0";
        product.Price = (product?.SalePrice ?? 0);
        //product.SalePrice = product[CustomerTypeID] ?? product.SalePrice;
      });
    }
    else {
      SaleProductList?.forEach(product => {
        if (ApplicableGSTType === APPLICABLE_GST_TYPE.C) {
          //product.SalePrice = product[CustomerTypeID] ?? product.SalePrice;
          product.IGSTAmount = "0";
          product.CGSTAmount = Number((((product?.SalePrice ?? 0) - ((product?.SalePrice ?? 0) * (100 / (100 + ((product?.CGST * 2) ?? 0))))) / 2).toFixed(2));
          product.SGSTAmount = Number((((product?.SalePrice ?? 0) - ((product?.SalePrice ?? 0) * (100 / (100 + ((product?.SGST * 2) ?? 0))))) / 2).toFixed(2));
          product.Price = Number(((product?.SalePrice ?? 0) - (product.CGSTAmount ?? 0) - (product.SGSTAmount ?? 0)).toFixed(2));
          product.TotalCGSTAmount = Number((((product.CGSTAmount ?? 0)) * product.Quantity).toFixed(2));
          product.TotalSGSTAmount = Number((((product.SGSTAmount ?? 0)) * product.Quantity).toFixed(2));
          product.TotalGSTAmount = Number((((product.CGSTAmount ?? 0) + (product.SGSTAmount ?? 0)) * product.Quantity).toFixed(2));
        }
        else {
          //product.SalePrice = product[CustomerTypeID] ?? product.SalePrice;
          product.CGSTAmount = "0";
          product.SGSTAmount = "0";
          product.IGSTAmount = Number(((product?.SalePrice ?? 0) - ((product?.SalePrice ?? 0) * (100 / (100 + (product?.IGST ?? 0))))).toFixed(2));
          product.Price = Number((product?.SalePrice ?? 0) - (product.IGSTAmount ?? 0).toFixed(2));
          product.TotalIGSTAmount = Number((((product.IGSTAmount ?? 0)) * product.Quantity).toFixed(2));
        }
      });
    }
    this.calculateDiscount();
    this.updateTotalValues();
    this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
  }

  updateSalePrice(event, index) {
    const salePrice = (event?.target as HTMLInputElement)?.value;
    let SaleProductList: any[] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    SaleProductList[index].SalePrice = salePrice;
    this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
    this.calculateGST();
  }
  onAmpChange() {
    const AmpID = this.SaleInfoForm.get("AmpID")?.value;
    if ([undefined, null, ""].includes(AmpID)) {
      this.SaleInfoForm.get("OldBatteryCount")?.setValue("0");
      this.SaleInfoForm.get("OldBatteryPurchasePrice")?.setValue("0");
      this.SaleInfoForm.get("TotalOldBatteryAmount")?.setValue("0");
      this.updateTotalValues();
    }
  }
  onDiscountChange(event, index) {
    const Discount = (event?.target as HTMLInputElement)?.value;
    let SaleProductList: any[] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    SaleProductList[index].Discount = Discount;
    this.calculateGST();
    this.updateTotalValues();
  }
  calculateDiscount() {
    let SaleProductList: any[] = this.SaleInfoForm.get("SaleProductList")?.value ?? [];
    SaleProductList?.forEach(prod => {
      prod.DiscountAmount = Number(((parseFloat(prod.Price ?? 0) * parseFloat(prod.Discount ?? 0)) / 100).toFixed(2));
      prod.TotalDiscountAmount = Number((parseFloat(prod.DiscountAmount ?? 0) * parseInt(prod.Quantity ?? 0)).toFixed(2));
      prod.Price = Number((parseFloat(prod.Price ?? 0) - parseFloat(prod.DiscountAmount ?? 0)).toFixed(2));
      prod.TotalAmount = Number((parseFloat(prod.Price ?? 0) * parseInt(prod.Quantity ?? 0)).toFixed(2));
    });
    this.SaleInfoForm.get("SaleProductList")?.setValue(SaleProductList);
  }
}