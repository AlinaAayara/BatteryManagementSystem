import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  public CustomerList;
  public showLoader: boolean = false;
  public CustomerName = "";
  @ViewChild(CustomerSearchComponent) childSearchComponentRef: CustomerSearchComponent;

  constructor(
    private _customerInfoService: CustomerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.serchCustomer();
  }

  serchCustomer() {
    this._customerInfoService.GetCustomer(this.getRequestBody()).subscribe({
      next: data => {
        this.CustomerList = data;
        this.childSearchComponentRef.serchCustomer();
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_CustomerInfo",
      CustomerName: [null, undefined, ""].includes(this.CustomerName) ? "" : this.CustomerName
    }
  }

}
