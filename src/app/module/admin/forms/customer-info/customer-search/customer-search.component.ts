import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";
import { ActivatedRoute } from "@angular/router";
import { Constant } from "src/app/config/constants";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  public CustomerList;
  public showLoader: boolean = false;
  public CustomerName = "";
  public id;
  public isWrite: boolean = false;
  public isDelete: boolean = false;
  Object = Object;
  public CustomerTypes = Constant.CUSTOMER_TYPE;
  public CustomerTypeID = "";
  @Output() public emitCustomer = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private _customerInfoService: CustomerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isWrite = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISWRITE);
    this.isDelete = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISDELETE);
    //this.serchCustomer();
  }

  serchCustomer() {
    this._customerInfoService.GetCustomer(this.getRequestBody()).subscribe({
      next: data => {
        this.CustomerList = data;
      },
      error: error => {
        this.CustomerList = [];
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_CustomerInfo",
      CustomerName: [null, undefined, ""].includes(this.CustomerName) ? "" : this.CustomerName,
      CustomerTypeID: [null, undefined, ""].includes(this.CustomerTypeID) ? "" : this.CustomerTypeID
    }
  }
  deleteItem(item) {
    this._sharedDataService.deleteRecord(this.deleteBody(Object.values(item)[0])).subscribe({
      next: data => {
        this._sharedDataService.success("Deleted successfully !");
        this.removeItem(Object.values(item)[0]);
      },
      error: error => {
        this._sharedDataService.error(error)
      }
    });;
  }

  editItem(item) {
    this._sharedDataService.customerInfoEdit.next(item);
  }

  /* delete request body */
  deleteBody(id) {
    return {
      SubMenuID: this.id,
      PrimaryValue: id,
      MethodName: "deleteRecord"
    }
  }
  /* manually remove item from search result */
  removeItem(id) {
    this.CustomerList = this.CustomerList.filter((searchid) => { Object.values(searchid)[0] != id });
  }

  /* This will trigger on customer card selection */
  selectedCustomer(customer) {
    this.emitCustomer.emit(customer)
  }
}
