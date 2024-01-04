import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";
import { AdvanceSerachSaleInfo, SaleProductInfo } from "src/app/core/models/advance-search-sale-info";
import { WarrantyInfoService } from "src/app/Services/WarrantyInfo/warranty-info.service";
import { SaleReturnInfoService } from "src/app/Services/SaleReturnInfo/sale-return-info.service";
import { generatePostRequestBody } from "./fields";


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
  @ViewChild("scanControl") scanControl: ElementRef;
  @ViewChild("remarkControl") remarkControl: ElementRef;

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _saleReturnInfoService: SaleReturnInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.SaleReturnInfoFormBuilder();
  }
  SaleReturnInfoFormBuilder() {
    this.SaleReturnInfoForm = this._FormBuilder.group({
      SaleReturnID: [""],
      SaleReturnDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      ReturnRemark: [""],
      SaleReturnProductInfo: this._FormBuilder.group(
        {
          SerialNo: [""],
          CustomerID: [""],
          SaleID: [""]
        }
      ),
      SaleReturnProductList: [[], Validators.required],
    });
  }
  /* function will trigger on Old Serial No change to get sale details related to serial no*/
  getProductDetailBySerialNo(SerialNo) {
    const obj = this._sharedDataService.requestBodyForAdvanceSearch("SaleInfo", "", "", SerialNo);
    this._sharedDataService.advacneSearchPOST(obj?.Url, obj?.requestBody).subscribe({
      next: data => {
        let saleProductInfo = data?.[0]?.saleProductInfo?.filter(serial => serial?.serialNo === SerialNo)?.[0];
        data[0].saleProductInfo = [saleProductInfo];
        let OldProduct = (new AdvanceSerachSaleInfo(data?.[0]));
        this.SaleReturnInfoForm.get("SaleReturnProductInfo")?.get("CustomerID")?.setValue(OldProduct?.CustomerID);
        this.SaleReturnInfoForm.get("SaleReturnProductInfo")?.get("SaleID")?.setValue(OldProduct?.SaleID);
        let SaleReturnProductList = this.SaleReturnInfoForm.get("SaleReturnProductList")?.value ?? [];
        let obj: any = OldProduct?.SaleProductInfo?.[0];
        obj.SerialNo = SerialNo;
        obj.CustomerID = OldProduct?.CustomerID;
        obj.SaleID = OldProduct?.SaleID;

        SaleReturnProductList.push(obj);

        this.SaleReturnInfoForm.get("SaleReturnProductList")?.setValue(SaleReturnProductList);
        this.showCustomerModel(OldProduct);
      },
      error: error => {
        this._sharedDataService.error(error)
      }
    });
  }
  /* This will create array based on Serial no input string, in which you have comma seperated serial no */
  separateSerialNo() {
    let serialNo = this.SaleReturnInfoForm.get("SaleReturnProductInfo")?.value?.SerialNo;
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
      this.SaleReturnInfoForm.get("SaleReturnProductInfo")?.get("SerialNo")?.setValue("");
      this.scanControl.nativeElement.focus();
    }
    else{
      this.remarkControl.nativeElement.focus();
    }
  }
  showCustomerModel(res) {
    this.selectedCustomer = res.CustomerInfo;
    this.SaleReturnInfoForm.get("CustomerID")?.setValue(res.CustomerInfo?.CustomerID);
    this.btnChooseCustomerText = this.selectedCustomer?.CustomerName;
  }


  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    this._saleReturnInfoService.AddSaleReturn(generatePostRequestBody(this.SaleReturnInfoForm.getRawValue(), this.isAdd ? "0" : "1")).subscribe({
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
    this.selectedCustomer = {}
    this.btnChooseCustomerText = Constant.CHOOSE_SOLD_PRODUCT;
  }

  /* remove item from list it will trigger from front end sale return product table upon click on delete button */
  removeSaleProduct(item) {
    let SaleProductList: any[] = this.SaleReturnInfoForm.get("SaleReturnProductList")?.value ?? [];
    SaleProductList = SaleProductList?.filter((itm) => item != itm);
    this.SaleReturnInfoForm.get("SaleReturnProductList")?.setValue(SaleProductList);
    if (SaleProductList.length == 0) {
      this.selectedCustomer = null
    }
  }
}
