import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PurchaseReturnInfoService } from "src/app/Services/PurchaseReturnInfo/purchase-return-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { PurchaseReturnInfo } from "src/app/core/models/purrchase-return-info";

@Component({
  selector: 'app-accept-purchase-return-info-common',
  templateUrl: './accept-purchase-return-info-common.component.html',
  styleUrls: ['./accept-purchase-return-info-common.component.css']
})
export class AcceptPurchaseReturnInfoCommonComponent implements OnInit, OnChanges {
  PurchaseReturnInfoList: PurchaseReturnInfo[];
  PurchaseInwardInfoForm: FormGroup;
  public isAdd: boolean = true;
  public showLoader: boolean = false;

  constructor(private _sharedDataService: SharedDataService,
    private _PurchaseReturnInfoService: PurchaseReturnInfoService,
    private _FormBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.PurchaseInwardInfoFormBuilder();
    this.selPurchaseReturn();
  }
  PurchaseInwardInfoFormBuilder() {
    this.PurchaseInwardInfoForm = this._FormBuilder.group({
      AcceptDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      PurchaseReturnID: [[], Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["PurchaseReturnInfoList"]) {
      this.PurchaseReturnInfoList = changes["PurchaseReturnInfoList"]?.currentValue;
    }
  }
  selPurchaseReturn() {
    this._PurchaseReturnInfoService.selPurchaseReturn(this.selPurchaseReturnRequestBody()).subscribe({
      next: data => {
        this.PurchaseReturnInfoList = new Array<PurchaseReturnInfo>();
        data.forEach(item => {
          this.PurchaseReturnInfoList.push(new PurchaseReturnInfo(item));
          this.setCheckedList();
        });
      },
      error: error => {
        this.showLoader = false;
        this.PurchaseReturnInfoList = new Array<PurchaseReturnInfo>();
        this._sharedDataService.error(error);
      }
    });
  }
  /* request body get Bill No api call */
  public selPurchaseReturnRequestBody() {
    return {
      MethodName: "Sel_PurchaseReturn"
    }
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    let Data = this.PurchaseInwardInfoForm.value;
    Data.MethodName = "InUp_PurchaseReturnInfo";
    Data.Mode = "4";
    Data.PurchaseReturnID = Data.PurchaseReturnID.join(",")
    this._PurchaseReturnInfoService.UpdatePurchaseReturn(Data).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Return Completed successfully !");
        this.clearSaleReturn();
        this.selPurchaseReturn();
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
    this.PurchaseInwardInfoForm.get("AcceptDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.PurchaseReturnInfoList = [];
  }
  checkElement(e, i) {
    this.PurchaseReturnInfoList[i].Checked = e?.target?.checked;
    this.setCheckedList();
  }
  setCheckedList() {
    this.PurchaseInwardInfoForm.get("PurchaseReturnID")?.setValue(this.PurchaseReturnInfoList?.filter(prod => prod?.Checked).map(prod => prod?.PurchaseReturnID));
  }
}
