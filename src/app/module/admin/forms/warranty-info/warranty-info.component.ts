import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";
import { AdvanceSerachSaleInfo, SaleProductInfo } from "src/app/core/models/advance-search-sale-info";
import { WarrantyInfoService } from "src/app/Services/WarrantyInfo/warranty-info.service";
import { generatePostRequestBody } from "./fields";


@Component({
  selector: 'app-warranty-info',
  templateUrl: './warranty-info.component.html',
  styleUrls: ['./warranty-info.component.css']
})
export class WarrantyInfoComponent implements OnInit {
  WarrantyInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public selectedCustomer: any;
  public btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  public SaleProductInfo: SaleProductInfo[];

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _warrantyInfoService: WarrantyInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.SaleInfoFormBuilder();
    this.getSaleInfo();
    this.edit();
  }
  SaleInfoFormBuilder() {
    this.WarrantyInfoForm = this._FormBuilder.group({
      WarrantyID: [""],
      ReplacementDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      DiscountAmount: [{ value: 0, disabled: true }],
      FinalPrice: [{ value: 0, disabled: true }],
      WarrantyProductList: [[], Validators.required],
      WarrantyProductInfo: this._FormBuilder.group(
        {
          WarrantyProductID: [""],
          WarrantyID: [""],
          WarrantyType: ["F"],
          CustomerID: [""],
          SaleID: [""],
          ProductID: [""],
          GuaranteePeriod: [""],
          GuaranteeEndDate: [""],
          WarrantyPeriod: [""],
          WarrantyEndDate: [""],
          OldSerialNo: [""],
          NewSerialNo: [""],
          DiscountPercentage: [""],
          DiscountAmount: [{ value: 0, disabled: true }],
          SalePrice: [""],
          FinalPrice: [{ value: "", disabled: true }],
          IsReturnToCompany: [""],
          ReturnToCompanyDate: [""],
          OldProduct: [],
          NewProduct: []
        }
      ),
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
    this.WarrantyInfoForm.get("CustomerID")?.setValue(res.CustomerInfo?.CustomerID);
    this.showCustomerInfoSlideIn(false);
    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
    this.getSalePriceByCusomerTypeID();
  }
  showSaleModel(res) {
    this.WarrantyInfoForm.get("SaleID")?.setValue(res?.SaleID);
    this.WarrantyInfoForm.get("SaleProductID")?.setValue(res?.SaleProductInfo?.[0]?.SaleProductID);
    this.WarrantyInfoForm.get("OldSerialNo")?.setValue(res?.SaleProductInfo?.[0]?.SerialNo);
    this.SaleProductInfo = res?.SaleProductInfo ?? [];
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  /* request body for Serial no api call */
  public getSerialNoDetailRequestBody(SerialNo) {
    return {
      MethodName: "Sel_PurchaseProductInfo_BySerialNo",
      SerialNo: SerialNo,
      WarrantyID: this.WarrantyInfoForm.get("WarrantyID")?.value ?? ""
    }
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    this._warrantyInfoService.AddWarranty(generatePostRequestBody(this.WarrantyInfoForm.getRawValue(), this.isAdd ? "0" : "1")).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("saved successfully !");
        this.clearWarranty();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  /* remove item from list it will trigger from front end purchase product table upon click on delete button */
  removeNewProduct(item) {
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewSerialNo")?.setValue("");
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewProduct")?.setValue("");
    // let WarrantyProductList: any[] = this.WarrantyInfoForm.get("WarrantyProductList")?.value ?? [];
    // WarrantyProductList = WarrantyProductList?.filter((itm) => item != itm);
    // this.WarrantyInfoForm.get("WarrantyProductList")?.setValue(WarrantyProductList);
    // this.calculateDiscuntAmount();
  }

  /* remove item from list it will trigger from front end Sale product table upon click on delete button */
  removeOldProduct(item) {
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("OldSerialNo")?.setValue("");
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("OldProduct")?.setValue("");
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("CustomerID")?.setValue("");
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("SaleID")?.setValue("");
    this.selectedCustomer = "";
  }
  /* clear purchase whole form on save or on clear */
  clearWarranty() {
    this.WarrantyInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.WarrantyInfoForm.get("ReplacementDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.SaleProductInfo = [];
    this.selectedCustomer = {}
    this.clearWarrantyProduct();
  }
  /* calculate discount amount */
  calculateDiscuntAmount() {
    let SalePrice = this.WarrantyInfoForm?.get("WarrantyProductInfo")?.get("SalePrice")?.value ?? 0;
    let DiscountPercentage = (this.WarrantyInfoForm?.get("WarrantyProductInfo")?.get("DiscountPercentage")?.value ?? 0) / 100;
    let DiscountAmount = 0;
    let FinalPrice = 0;

    DiscountAmount = (parseFloat((parseFloat(SalePrice) * DiscountPercentage).toFixed(2))) ?? 0;
    FinalPrice = parseFloat((SalePrice - DiscountAmount).toFixed(2));

    this.WarrantyInfoForm?.get("WarrantyProductInfo")?.get("DiscountAmount")?.setValue(DiscountAmount);
    this.WarrantyInfoForm?.get("WarrantyProductInfo")?.get("FinalPrice")?.setValue(FinalPrice);
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    this._sharedDataService.warrantyInfoEdit.subscribe(item => {
      this.WarrantyInfoForm.patchValue(item);
      this.isAdd = false;
      this.WarrantyInfoForm.get("WarrantyProductList")?.setValue(item?.WarrantyProductInfo ?? []);
      this.calculateDiscuntAmount();
    });
  }

  openPurchaseInvoice(PurchaseID) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_PurchaseInfo&PurchaseID=" + PurchaseID);
  }
  openSaleInvoice(SaleID) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_SaleInfo&SaleID=" + SaleID);
  }
  /* after scan of  serial no  this will get all product related details from database base on entered SERIAL NO*/
  getNewProductDetailBySerialNo() {
    let SerialNo = this.WarrantyInfoForm.get("WarrantyProductInfo")?.value?.NewSerialNo;
    if (["", undefined, null].includes(SerialNo)) {
      return;
    }

    this._saleInfoService.getSerialNoDetail(this.getSerialNoDetailRequestBody(SerialNo)).subscribe({
      next: data => {
        if (data?.[0]) {
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewProduct")?.setValue(data?.[0]);
        } else {
          this._sharedDataService.NotieError("Enter valid serial no.");
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewSerialNo")?.setValue("");
        }
      },
      error: error => {
        this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewSerialNo")?.setValue("");
        this._sharedDataService.NotieError(error.error);
        document?.getElementById("id_SerialNo")?.focus();
      }
    });
  }
  /* function will trigger on Old Serial No change to get sale details related to serial no*/
  getOldProductDetailBySerialNo() {
    let SerialNo = this.WarrantyInfoForm.get("WarrantyProductInfo")?.value?.OldSerialNo;
    if (["", undefined, null].includes(SerialNo)) {
      return;
    }
    const obj = {
      MethodName: "Sel_SerialNo_ForWarranty",
      SerialNo: SerialNo,
      Mode: "0"
    };

    this._warrantyInfoService.GetOldSerialNo(obj).subscribe({
      next: data => {
        let saleProductInfo = data?.[0]?.saleProductInfo?.filter(serial => (serial?.serialNo === SerialNo && [0, null, undefined, ""].includes(serial.saleReturnID)))?.[0];
        if (saleProductInfo) {
          data[0].saleProductInfo = [saleProductInfo];
          let OldProduct = (new AdvanceSerachSaleInfo(data?.[0]));
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("OldProduct")?.setValue(OldProduct);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("CustomerID")?.setValue(OldProduct?.CustomerID);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("SaleID")?.setValue(OldProduct?.SaleID);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("ProductID")?.setValue(saleProductInfo?.productID);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("GuaranteePeriod")?.setValue(saleProductInfo?.guaranteePeriod);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("GuaranteeEndDate")?.setValue(saleProductInfo?.guaranteeEndDate);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("WarrantyPeriod")?.setValue(saleProductInfo?.warrantyPeriod);
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("WarrantyEndDate")?.setValue(saleProductInfo?.warrantyEndDate);

          this.showCustomerModel(OldProduct);
          this.showSaleModel(OldProduct);
        }
        else {
          this._sharedDataService.NotieError("Enter valid serial no.");
          this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("OldSerialNo")?.setValue("");
          this.clearWarrantyProduct();
        }
      },
      error: error => {
        this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("OldSerialNo")?.setValue("");
        this._sharedDataService.NotieError(error.error);
        document?.getElementById("id_OldSerialNo")?.focus();
        this.clearWarrantyProduct();
      }
    })
  }

  /* function will trigger on warranty type radio button change */
  onWarrantyTypeChange() {
    const WarrantyType = this.WarrantyInfoForm.get("WarrantyProductInfo")?.value?.WarrantyType;
    if (WarrantyType === 'F') {
      this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("DiscountPercentage")?.setValue("");
      this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("DiscountAmount")?.setValue("");
      this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("SalePrice")?.setValue("");
      this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("FinalPrice")?.setValue("");
    }
    else {
      const SalePrice = this.getSalePriceByCusomerTypeID();
      this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("SalePrice")?.setValue(SalePrice);
      this.calculateDiscuntAmount();
    }
  }
  /* set sale price depend upon product + customer type
    1) On selection of customer
    2) On entered serial no 
     */

  getSalePriceByCusomerTypeID() {
    let NewProduct = this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("NewProduct")?.value;
    if (NewProduct && this.selectedCustomer?.CustomerTypeID) {
      const CustomerTypeID = CustomerTypeID_ToPurchaseProduct[this.selectedCustomer?.CustomerTypeID];
      return NewProduct[CustomerTypeID];
    }
    else return 0;
  }
  SubmitWarrantyProduct() {

    let WarrantyProductInfoData = this.WarrantyInfoForm.get("WarrantyProductInfo")?.getRawValue();
    const isValid = this.checkWarrantyProductInfoValidation(WarrantyProductInfoData);
    if (isValid) {
      let WarrantyProductList = this.WarrantyInfoForm.get("WarrantyProductList")?.value ?? [];
      WarrantyProductList.push(this.WarrantyInfoForm.get("WarrantyProductInfo")?.getRawValue());
      this.WarrantyInfoForm.get("WarrantyProductList")?.setValue(WarrantyProductList);
      this.clearWarrantyProduct();
    }
  }

  /* Manual validation on add button click(child) */
  checkWarrantyProductInfoValidation(data) {
    if (["", null, undefined].includes(data?.OldSerialNo)) {
      this._sharedDataService.NotieError("Please enter Old Serial No");
      return false;
    } else if (["", null, undefined].includes(data.NewSerialNo)) {
      this._sharedDataService.NotieError("Please enter New Serial No");
      return false;
    }
    return true;
  }

  clearWarrantyProduct() {
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.reset();
    this.selectedCustomer = null;
    this.showSaleModel(null);
    this.WarrantyInfoForm.get("WarrantyProductInfo")?.get("WarrantyType")?.setValue("F");
  }
  removeWarrantyProduct(item) {
    let WarrantyProductList: any[] = this.WarrantyInfoForm.get("WarrantyProductList")?.value ?? [];
    WarrantyProductList = WarrantyProductList?.filter((itm) => item != itm);
    this.WarrantyInfoForm.get("WarrantyProductList")?.setValue(WarrantyProductList);
  }
}