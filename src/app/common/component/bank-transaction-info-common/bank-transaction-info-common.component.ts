import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { AppUrl } from "src/app/config/api";
import { SmartFormComponent } from "src/app/common/smart-form/smart-form.component";
import { BankTransactionInfoService } from "src/app/Services/BankTransactionInfo/bank-transaction-info.service";

@Component({
  selector: 'app-bank-transaction-info-common',
  templateUrl: './bank-transaction-info-common.component.html',
  styleUrls: ['./bank-transaction-info-common.component.css']
})
export class BankTransactionInfoCommonComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public transactionList;
  @ViewChild(SmartFormComponent, { static: false }) smartFormComponent: SmartFormComponent;

  constructor(
    private _BankTransactionInfoService: BankTransactionInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BankTransactionInfo";
    delete Data["Balance"];
    // delete Data["ProductName"];
    this._BankTransactionInfoService.AddBankTransaction(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Transaction saved successfully !");
        this.manuallyClearField = true;
        this.smartFormComponent.SmartForm.get("Balance")?.setValue(0);
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._BankTransactionInfoService.GetBankTransaction(this.getRequestBody()).subscribe({
      next: data => {
        this.transactionList = data;
      },
      error: error => {
        this.transactionList = [];
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BankTransactionInfo",
      TransactionDate: this.smartFormComponent?.SmartForm?.get("TransactionDate")?.value ?? this._sharedDataService?.currentUser?.todaysDate
    }
  }

  public changeEmit(obj) {
    if (obj?.field?.fieldName === "BankID") {
      this.getBankBalance(obj);
    }
    else if (obj?.field?.fieldName === "TransactionDate") {
      this.getList();
    }
  }

  public getBankBalance(obj) {
    const field = obj?.field;
    if (!["", undefined, null].includes(obj?.value)) {
      this.smartFormComponent.loadListData(field);
      setTimeout(() => {
        const bankData = this.smartFormComponent["BankIDList"].filter(bank => bank.BankID == obj.value)?.[0];
        this.smartFormComponent.SmartForm.get("Balance")?.setValue(bankData?.Balance ?? 0);
      }, 1000);
    }
  }
}
