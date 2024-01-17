import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { SaleInfoService } from "src/app/Services/SaleInfo/sale-info.service";
import { Constant, CustomerTypeID_ToPurchaseProduct } from "src/app/config/constants";
import { SaleProductInfo } from "src/app/core/models/advance-search-sale-info";
import { WarrantyInfoService } from "src/app/Services/WarrantyInfo/warranty-info.service";
import { SaleReturnInfoService } from "src/app/Services/SaleReturnInfo/sale-return-info.service";
import { WarrantyReturnInfoService } from "src/app/Services/WarrantyReturnInfo/warranty-return-info.service";


@Component({
  selector: 'app-warranty-return-info',
  templateUrl: './warranty-return-info.component.html',
  styleUrls: ['./warranty-return-info.component.css']
})
export class WarrantyReturnInfoComponent implements OnInit {
  WarrantyReturnInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isCustomerInfoSlideIn: boolean = false;
  public WarrentyReturnInfoList: any[];
  public FromDate: string;
  public ToDate: string;

  constructor(
    private _FormBuilder: FormBuilder,
    private _saleInfoService: SaleInfoService,
    private _warrantyReturnInfoService: WarrantyReturnInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.WarrantyReturnInfoFormBuilder();
    this.edit();

    this.ToDate = this.FromDate = this._sharedDataService?.currentUser?.todaysDate;

  }
  WarrantyReturnInfoFormBuilder() {
    this.WarrantyReturnInfoForm = this._FormBuilder.group({
      ReturnToCompanyDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      IsReturnToCompany: ["1", Validators.required],
      OldSerialNo: [[], Validators.required]
    });
  }

  /* This will trigger when select already sold item using subject */
  getWarrantyReturn() {
    let obj = {
      FromDate: this.FromDate,
      ToDate: this.ToDate,
      MethodName: "Sel_WarrantyInfo_ForCompanyReturn"
    }
    this._warrantyReturnInfoService.getWarrantyReturn(obj).subscribe({
      next: data => {
        this.showLoader = false;
        this.WarrentyReturnInfoList = data;
        this.setCheckedWarrantyList();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  checkElement(e, i) {
    console.log("e", e);
    this.WarrentyReturnInfoList[i].Checked = e?.target?.checked;
    console.log("this.WarrentyReturnInfoList", this.WarrentyReturnInfoList);
    this.setCheckedWarrantyList();
  }
  setCheckedWarrantyList() {
    this.WarrantyReturnInfoForm.get("OldSerialNo")?.setValue(this.WarrentyReturnInfoList.filter(prod => prod.Checked).map(prod=> prod.OldSerialNo));
    console.log("this.OldSerialNo", this.WarrantyReturnInfoForm.get("OldSerialNo")?.value);
  }
  /* function to show customer info componet in slide in on cick of choose customer button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    let Data = this.WarrantyReturnInfoForm.value;
    Data.MethodName = "InUp_WarrantyProductInfo";
    Data.Mode = "4";
    Data.OldSerialNo = Data.OldSerialNo.join(",")
    this._warrantyReturnInfoService.ReturnWarrantyForCompanyReturn(Data).subscribe({
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
    this.WarrantyReturnInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.ToDate = this.FromDate = this._sharedDataService?.currentUser?.todaysDate;
    this.WarrantyReturnInfoForm.get("ReturnToCompanyDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.WarrentyReturnInfoList = [];
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    // this._sharedDataService.warrantyInfoEdit.subscribe(item => {
    //   this.showCustomerModel(item);
    //   this.showSaleModel(item);
    //   this.WarrantyReturnInfoForm.patchValue(item);
    //   this.isAdd = false;
    // });
  }
}
