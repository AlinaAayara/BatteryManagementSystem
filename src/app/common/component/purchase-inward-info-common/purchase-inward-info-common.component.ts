import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PurchaseInwardInfoService } from "src/app/Services/Distributor/PurchaseInwardInfo/purchase-inward-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { AdvanceSerachSaleInfo } from "src/app/core/models/advance-search-sale-info";
import { PurchaseInwardInfo } from "src/app/core/models/purchase-inward-info";

@Component({
  selector: 'app-purchase-inward-info-common',
  templateUrl: './purchase-inward-info-common.component.html',
  styleUrls: ['./purchase-inward-info-common.component.css']
})
export class PurchaseInwardInfoCommonComponent implements OnInit, OnChanges {
  PurchaseInwardInfoList: PurchaseInwardInfo[];
  PurchaseInwardInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;

  constructor(private _sharedDataService: SharedDataService,
    private _PurchaseInwardInfoService: PurchaseInwardInfoService,
    private _FormBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.PurchaseInwardInfoFormBuilder();
    this.getPurchaseInward();
  }
  PurchaseInwardInfoFormBuilder() {
    this.PurchaseInwardInfoForm = this._FormBuilder.group({
      PurchaseDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      SaleID: [[], Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["PurchaseInwardInfoList"]) {
      this.PurchaseInwardInfoList = changes["PurchaseInwardInfoList"]?.currentValue;
    }
  }
  getPurchaseInward() {
    this._PurchaseInwardInfoService.GetPurchaseInward(this.getPurchaseInwardRequestBody()).subscribe({
      next: data => {
        this.PurchaseInwardInfoList = new Array<PurchaseInwardInfo>();
        data.forEach(item => {
          this.PurchaseInwardInfoList.push(new PurchaseInwardInfo(item));
          this.setCheckedList();
        });
      },
      error: error => {
        this.showLoader = false;
        this.PurchaseInwardInfoList = new Array<PurchaseInwardInfo>();
        this._sharedDataService.error(error);
      }
    });
  }
  /* request body get Bill No api call */
  public getPurchaseInwardRequestBody() {
    return {
      MethodName: "Sel_Inward_ForPurchase"
    }
  }

   /* This will trigger On final save button  */
   Submit(e) {
    this.showLoader = true;
    let Data = this.PurchaseInwardInfoForm.value;
    Data.MethodName = "InUp_PurchaseInwardInfo";
    Data.Mode = "0";
    Data.SaleID = Data.SaleID.join(",")
    this._PurchaseInwardInfoService.AddPurchaseInward(Data).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Inward Completed successfully !");
        this.clearSaleReturn();
        this.getPurchaseInward();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }


  /* clear purchase whole form on save or on clear */
  clearSaleReturn() {
    this.PurchaseInwardInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.PurchaseInwardInfoForm.get("PurchaseDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.PurchaseInwardInfoList = [];
  }
  checkElement(e, i) {
    this.PurchaseInwardInfoList[i].Checked = e?.target?.checked;
    this.setCheckedList();
  }
  setCheckedList() {
    this.PurchaseInwardInfoForm.get("SaleID")?.setValue(this.PurchaseInwardInfoList?.filter(prod => prod?.Checked).map(prod => prod?.SaleID));
  }
}
