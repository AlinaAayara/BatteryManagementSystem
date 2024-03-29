import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleInfoService } from 'src/app/Services/SaleInfo/sale-info.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Constant, USER_TYPES } from 'src/app/config/constants';
import { PartyTransactionInfoService } from 'src/app/Services/PartyTransactionInfo/party-transaction-info.service';

@Component({
  selector: 'app-party-transaction-info-common',
  templateUrl: './party-transaction-info-common.component.html',
  styleUrls: ['./party-transaction-info-common.component.css']
})
export class PartyTransactionInfoCommonComponent implements OnInit, OnChanges {
  public manuallyClearField: boolean = false;
  public partyTransactionList;
  public showLoader: boolean = false;
  PartyTransactionInfoForm: FormGroup;
  public isAdd: boolean = true;
  public btnChoosePartyText = Constant.CHOOSE_PARTY;
  public isPartyInfoSlideIn: boolean = false;
  @Input() public btnChooseText;
  @Input() public userType;
  public crDr = Constant.CR_OR_DR;

  constructor(
    private _partyTransactionInfoService: PartyTransactionInfoService,
    private _sharedDataService: SharedDataService,
    private _saleInfoService: SaleInfoService,
    private _FormBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.partyTransactionInfoFormBuilder();
    this.getSelectedOrAdddedParty();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['userType']) {
      this.userType = changes['userType']?.currentValue;
    }
    if (changes?.['btnChooseText']) {
      this.btnChooseText = changes['btnChooseText']?.currentValue;
      this.btnChoosePartyText = this.btnChooseText;
    }
  }
  partyTransactionInfoFormBuilder() {
    this.PartyTransactionInfoForm = this._FormBuilder.group({
      PartyTransactionID: [""],
      PartyID: ["", Validators.required],
      TransactionDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      TransactionType: ["CR", Validators.required],
      Amount: ["", Validators.required],
      Remark: [""],
      Balance: [{ value: 0, disabled: true }]
    });
  }
  /* function to show party info componet in slide in on cick of choose party button  */
  showPartyInfoSlideIn(isShow) {
    this.isPartyInfoSlideIn = isShow;
  }
  getSelectedOrAdddedParty() {
    this._sharedDataService.getSelectedParty.subscribe(res => {
      this.PartyTransactionInfoForm.get("PartyID")?.setValue(res?.PartyID);
      if (!["", undefined, null].includes(res?.PartyID)) {
        this.getPartyBalance(res?.PartyID);
        this.getList()
      }
      this.showPartyInfoSlideIn(false);
      this.btnChoosePartyText = res?.PartyName;
    });

    this._sharedDataService.getSelectedDistributor.subscribe(res => {
      this.PartyTransactionInfoForm.get("PartyID")?.setValue(res?.UserID);
      if (!["", undefined, null].includes(res?.UserID)) {
        this.getDistributorOrDealerBalance(res?.UserID);
        this.getList()
      }
      this.showPartyInfoSlideIn(false);
      this.btnChoosePartyText = res?.UserName + "-" + res?.Name;
    });

  }

  getPartyBalance(PartyID) {
    this._partyTransactionInfoService.GetPartyTransaction(this.getPartyBalanceRequestBody(PartyID)).subscribe({
      next: data => {
        const Balance = data?.[0]?.PartyBalance;
        this.PartyTransactionInfoForm.get("Balance")?.setValue(Balance);
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  };

  public getPartyBalanceRequestBody(PartyID) {
    return {
      MethodName: "Sel_PartyWise_Balance",
      PartyID: PartyID
    }
  }

  getDistributorOrDealerBalance(PartyID) {
    this._partyTransactionInfoService.GetPartyTransaction(this.getDistributorOrDealerRequestBody(PartyID)).subscribe({
      next: data => {
        const Balance = data?.[0]?.Balance;
        this.PartyTransactionInfoForm.get("Balance")?.setValue(Balance);
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  };

  public getDistributorOrDealerRequestBody(PartyID) {
    return {
      MethodName: "Sel_DistributorDealerWise_Balance",
      UserID: PartyID
    }
  }

  Submit() {
    let Data = this.PartyTransactionInfoForm.getRawValue();
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_PartyTransactionInfo";
    Data.Mode = this.isAdd ? "0" : "1";
    delete Data["Balance"];
    delete Data["PartyName"];
    this._partyTransactionInfoService.AddPartyTransaction(Data).subscribe({
      next: res => {
        this._sharedDataService.success("saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        if (this.userType === USER_TYPES.Manufacturer) {
          this.getDistributorOrDealerBalance(this.PartyTransactionInfoForm.get("PartyID")?.value);
        }
        else {
          this.getPartyBalance(this.PartyTransactionInfoForm.get("PartyID")?.value);
        }
        this.showLoader = false;

        this.isAdd = true;
        this.showLoader = false;
        this.PartyTransactionInfoForm.get("TransactionDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
        this.PartyTransactionInfoForm.get("TransactionType")?.setValue("CR");
        this.PartyTransactionInfoForm.get("Amount")?.setValue("0");
        this.PartyTransactionInfoForm.get("Remark")?.setValue("");

      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._partyTransactionInfoService.GetPartyTransaction(this.getRequestBody()).subscribe({
      next: data => {
        this.partyTransactionList = data;
      },
      error: error => {
        this.partyTransactionList = [];
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_PartyTransactionInfo",
      PartyID: this.PartyTransactionInfoForm.get("PartyID")?.value
    }
  }

  /* clear purchase whole form on save or on clear */
  clearField() {
    this.PartyTransactionInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.PartyTransactionInfoForm.get("TransactionDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.PartyTransactionInfoForm.get("TransactionType")?.setValue("CR");
    this.PartyTransactionInfoForm.get("Amount")?.setValue("0");
    this.btnChoosePartyText = Constant.CHOOSE_PARTY;
  }

  /* search list edit */
  edit(item) {
    this.PartyTransactionInfoForm.patchValue(item);
    this.isAdd = false;
    if (!["", undefined, null].includes(item?.PartyID)) {
      if (this.userType === USER_TYPES.Manufacturer) {
        this.getDistributorOrDealerBalance(item?.PartyID);
      }
      else {
        this.getPartyBalance(item?.PartyID);
      }
    }
    //this.btnChooseCustomerText = item?.CustomerName;
  }
  /* search list delete  */
  delete(item) {
    this.getList();
  }

  print(item) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_OldBatteryInfo&OldBatteryID=" + item.OldBatteryID);
  }
}
