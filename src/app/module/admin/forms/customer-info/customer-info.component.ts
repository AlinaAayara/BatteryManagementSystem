import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public customerList;
  public showLoader: boolean = false;

  constructor(
    private _customerInfoService: CustomerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    //this.getList();
  }
  submit(Data) {
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_CustomerInfo";
    this._customerInfoService.AddCustomer(Data).subscribe({
      next: res => {
        this._sharedDataService.success("Customer saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        this.showLoader = false;
        
        this.emitCustomer(res?.[0]);
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._customerInfoService.GetCustomer(this.getRequestBody()).subscribe({
      next: data => {
        this.customerList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_CustomerInfo"
    }
  }

/* This function will emit added customer or seleceted customer
  1) This will used during sale info
*/
  emitCustomer(Customer) {
    this._sharedDataService.getSelectedCustomer.next(Customer);
  }

}
