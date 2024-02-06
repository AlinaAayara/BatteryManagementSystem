import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { BasicBankService } from "src/app/Services/BasicBank/basic-bank.service";

@Component({
  selector: 'app-basic-bank-common',
  templateUrl: './basic-bank-common.component.html',
  styleUrls: ['./basic-bank-common.component.css']
})
export class BasicBankCommonComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public bankList;
  constructor(
    private _BasicBankService: BasicBankService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BasicBank";
    this._BasicBankService.AddBank(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Saved successfully !");
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._BasicBankService.GetBank(this.getRequestBody()).subscribe({
      next: data => {
        this.bankList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicBank"
    }
  }

}
