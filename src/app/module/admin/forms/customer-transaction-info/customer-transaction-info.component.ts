import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleInfoService } from 'src/app/Services/SaleInfo/sale-info.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Constant } from 'src/app/config/constants';
import { fields } from '../product-info/fields';
import { CustomerTransactionInfoService } from 'src/app/Services/CustomerTransactionInfo/customer-transaction-info.service';

@Component({
  selector: 'app-customer-transaction-info',
  templateUrl: './customer-transaction-info.component.html',
  styleUrls: ['./customer-transaction-info.component.css']
})
export class CustomerTransactionInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public customerTransactionList;
  public showLoader: boolean = false;
  CustomerTransactionInfoForm: FormGroup;
  public isAdd: boolean = true;
  public btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  public isCustomerInfoSlideIn: boolean = false;
  public crDr = Constant.CR_OR_DR;

  constructor(
    private _customerTransactionInfoService: CustomerTransactionInfoService,
    private _sharedDataService: SharedDataService,
    private _saleInfoService: SaleInfoService,
    private _FormBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.customerTransactionInfoFormBuilder();
    this.formField = fields;
    this.getSelectedOrAdddedCustomer();
  }

  customerTransactionInfoFormBuilder() {
    this.CustomerTransactionInfoForm = this._FormBuilder.group({
      CustomerTransactionID: [""],
      CustomerID: ["", Validators.required],
      TransactionDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      TransactionType: ["CR", Validators.required],
      Amount: ["", Validators.required],
      Remark: [""],
      Balance: [{ value: 0, disabled: true }]
    });
  }
  /* function to show party info componet in slide in on cick of choose party button  */
  showCustomerInfoSlideIn(isShow) {
    this.isCustomerInfoSlideIn = isShow;
  }
  getSelectedOrAdddedCustomer() {
    this._sharedDataService.getSelectedCustomer.subscribe(res => {
      this.CustomerTransactionInfoForm.get("CustomerID")?.setValue(res?.CustomerID);
      if (!["", undefined, null].includes(res?.CustomerID)) {
        this.getCustomerBalance(res?.CustomerID);
        this.getList();
      }
      this.showCustomerInfoSlideIn(false);
      this.btnChooseCustomerText = res?.CustomerName;
    });
  }

  getCustomerBalance(CustomerID) {
    this._customerTransactionInfoService.GetCustomerTransaction(this.getCustomerBalanceRequestBody(CustomerID)).subscribe({
      next: data => {
        const Balance = data?.[0]?.CustomerBalance;
        this.CustomerTransactionInfoForm.get("Balance")?.setValue(Balance);
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  };

  public getCustomerBalanceRequestBody(CustomerID) {
    return {
      MethodName: "Sel_CustomerWise_Balance",
      CustomerID: CustomerID
    }
  }

  Submit() {
    let Data = this.CustomerTransactionInfoForm.getRawValue();
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_CustomerTransactionInfo";
    Data.Mode = this.isAdd ? "0" : "1";
    delete Data["Balance"];
    delete Data["CustomerName"];
    this._customerTransactionInfoService.AddCustomerTransaction(Data).subscribe({
      next: res => {
        this._sharedDataService.success("saved successfully !");
        this.manuallyClearField = true;
        //this.getList();
        this.showLoader = false;
        this.clearField();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._customerTransactionInfoService.GetCustomerTransaction(this.getRequestBody()).subscribe({
      next: data => {
        this.customerTransactionList = data;
      },
      error: error => {
        this.customerTransactionList = [];
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_CustomerTransactionInfo",
      CustomerID: this.CustomerTransactionInfoForm.get("CustomerID")?.value
    }
  }

  /* clear purchase whole form on save or on clear */
  clearField() {
    this.CustomerTransactionInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.CustomerTransactionInfoForm.get("TransactionDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.CustomerTransactionInfoForm.get("TransactionType")?.setValue("CR");
    this.CustomerTransactionInfoForm.get("Amount")?.setValue("0");
    this.btnChooseCustomerText = Constant.CHOOSE_CUSTOMER;
  }

  /* search list edit */
  edit(item) {
    this.CustomerTransactionInfoForm.patchValue(item);
    this.isAdd = false;
    if (!["", undefined, null].includes(item?.CustomerID)) {
      this.getCustomerBalance(item?.CustomerID);
    }
    //this.btnChooseCustomerText = item?.CustomerName;
  }
  /* search list delete  */
  delete(item) {
    this.getList();
  }

}
