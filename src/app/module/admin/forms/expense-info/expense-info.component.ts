import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleInfoService } from 'src/app/Services/SaleInfo/sale-info.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Constant } from 'src/app/config/constants';
import { fields } from '../product-info/fields';
import { ExpenseInfoService } from 'src/app/Services/ExpenseInfo/expense-info.service';

@Component({
  selector: 'app-expense-info',
  templateUrl: './expense-info.component.html',
  styleUrls: ['./expense-info.component.css']
})
export class ExpenseInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public expenseList;
  public showLoader: boolean = false;
  ExpenseInfoForm: FormGroup;
  public isAdd: boolean = true;
  public crDr = Constant.CR_OR_DR;

  constructor(
    private _ExpenseInfoService: ExpenseInfoService,
    private _sharedDataService: SharedDataService,
    private _saleInfoService: SaleInfoService,
    private _FormBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.ExpenseInfoFormBuilder();
    this.formField = fields;
    this.getList();
  }

  ExpenseInfoFormBuilder() {
    this.ExpenseInfoForm = this._FormBuilder.group({
      ExpenseID: [""],
      TransactionDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      TransactionType: ["CR", Validators.required],
      Amount: ["", Validators.required],
      Remark: [""],
      Balance: [{ value: 0, disabled: true }]
    });
  }
  Submit() {
    let Data = this.ExpenseInfoForm.getRawValue();
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_ExpenseInfo";
    Data.Mode = this.isAdd ? "0" : "1";
    delete Data["Balance"];
    this._ExpenseInfoService.AddExpense(Data).subscribe({
      next: res => {
        this._sharedDataService.success("saved successfully !");
        this.manuallyClearField = true;
        this.getList();
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
    this._ExpenseInfoService.GetExpense(this.getRequestBody()).subscribe({
      next: data => {
        this.expenseList = data;
      },
      error: error => {
        this.expenseList = [];
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_ExpenseInfo",
      TransactionDate: this.ExpenseInfoForm.get("TransactionDate")?.value
    }
  }

  /* clear purchase whole form on save or on clear */
  clearField() {
    this.ExpenseInfoForm.reset();
    this.isAdd = true;
    this.showLoader = false;
    this.ExpenseInfoForm.get("TransactionDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.ExpenseInfoForm.get("TransactionType")?.setValue("CR");
    this.ExpenseInfoForm.get("Amount")?.setValue("0");
  }

  /* search list edit */
  edit(item) {
    this.ExpenseInfoForm.patchValue(item);
    this.isAdd = false;
  }
  /* search list delete  */
  delete(item) {
    this.getList();
  }

}
