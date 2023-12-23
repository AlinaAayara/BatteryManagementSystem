import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";
import { SaleProductInfo } from "src/app/core/models/advance-search-sale-info";
import { WarrantyInfoService } from "src/app/Services/WarrantyInfo/warranty-info.service";


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
      CustomerID: ["", Validators.required],
      ReplacementDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      SaleID: ["", Validators.required],
      SaleProductID: ["", Validators.required],
      OldSerialNo: ["", Validators.required],
      NewSerialNo: ["", Validators.required],
      DiscountPercentage: [0],
      DiscountAmount: [{ value: 0, disabled: true }],
      SalePrice: [0],
      FinalPrice: [{ value: 0, disabled: true }],
      SaleProductList: [[], Validators.required]
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

  /* after scan of  serial no  this will get all product related details from database base on entered SERIAL NO*/
  getProductDetailBySerialNo() {
    let SerialNo = this.WarrantyInfoForm.get("NewSerialNo")?.value;
    if (["", undefined, null].includes(SerialNo)) {
      return;
    }

    this._saleInfoService.getSerialNoDetail(this.getSerialNoDetailRequestBody(SerialNo)).subscribe({
      next: data => {
        let SaleProductList: [any] = this.WarrantyInfoForm.get("SaleProductList")?.value ?? [];
        SaleProductList.push(data?.[0]);
        this.WarrantyInfoForm.get("SaleProductList")?.setValue(SaleProductList);
        this.getSalePriceByCusomerTypeID();
        this.calculateDiscuntAmount();
      },
      error: error => {
        this.WarrantyInfoForm.get("SerialNo")?.setValue("");
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
      WarrantyID: this.WarrantyInfoForm.get("WarrantyID")?.value ?? ""
    }
  }

  /* set sale price depend upon product + customer type
  1) On selection of customer
  2) On entered serial no 
   */

  getSalePriceByCusomerTypeID() {
    let SaleProductList: [any] = this.WarrantyInfoForm.get("SaleProductList")?.value ?? [];
    if (SaleProductList?.length > 0 && this.selectedCustomer?.CustomerTypeID) {
      const CustomerTypeID = CustomerTypeID_ToPurchaseProduct[this.selectedCustomer?.CustomerTypeID];

      SaleProductList.forEach(prod => {
        prod.SalePrice = prod[CustomerTypeID],
          this.WarrantyInfoForm.get("SalePrice")?.setValue(prod[CustomerTypeID]);
      });
      this.WarrantyInfoForm.get("SaleProductList")?.setValue(SaleProductList);
    }
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    let Data = this.WarrantyInfoForm.value;
    Data.MethodName = "InUp_WarrantyInfo";
    Data.Mode = this.isAdd ? "0" : "1";
    delete (Data.SaleProductList);
    this._warrantyInfoService.AddWarranty(Data).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Completed successfully !");
        this.clearWarranty();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  /* remove item from list it will trigger from front end purchase product table upon click on delete button */
  removeSaleProduct(item) {
    let SaleProductList: any[] = this.WarrantyInfoForm.get("SaleProductList")?.value ?? [];
    SaleProductList = SaleProductList?.filter((itm) => item != itm);
    this.WarrantyInfoForm.get("SaleProductList")?.setValue(SaleProductList);
    this.calculateDiscuntAmount();
  }


  /* clear purchase whole form on save or on clear */
  clearWarranty() {
    this.WarrantyInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.WarrantyInfoForm.get("ReplacementDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.SaleProductInfo = [];
    this.selectedCustomer = {}
  }
  /* calculate discount amount */
  calculateDiscuntAmount() {
    let SalePrice = this.WarrantyInfoForm.get("SalePrice")?.value ?? 0;
    let DiscountPercentage = (this.WarrantyInfoForm.get("DiscountPercentage")?.value ?? 0) / 100;
    let DiscountAmount = 0;
    let FinalPrice = 0;

    DiscountAmount = (parseFloat((parseFloat(SalePrice) * DiscountPercentage).toFixed(2))) ?? 0;
    FinalPrice = parseFloat((SalePrice - DiscountAmount).toFixed(2));

    this.WarrantyInfoForm.get("DiscountAmount")?.setValue(DiscountAmount);
    this.WarrantyInfoForm.get("FinalPrice")?.setValue(FinalPrice);
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    this._sharedDataService.warrantyInfoEdit.subscribe(item => {
      this.showCustomerModel(item);
      this.showSaleModel(item);
      this.WarrantyInfoForm.patchValue(item);
      this.isAdd = false;
      this.WarrantyInfoForm.get("CustomerID")?.setValue(item?.CustomerInfo?.CustomerID);
      this.WarrantyInfoForm.get("SaleProductList")?.setValue(item?.SaleProductInfo ?? []);
      this.calculateDiscuntAmount();
    });
  }
}
