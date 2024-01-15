import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";
import { ActivatedRoute } from "@angular/router";
import { Constant } from "src/app/config/constants";
import Swal from "sweetalert2";

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
  public CustomerTypeID = "B";
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
    this.serchCustomer();
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._sharedDataService.deleteRecord(this.deleteBody(Object.values(item)[0])).subscribe({
          next: data => {
            this._sharedDataService.success("Deleted successfully !");
            this.removeItem(Object.values(item)[0]);
          },
          error: error => {
            this._sharedDataService.error(error)
          }
        });
      }
    });
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
    this.CustomerList = this.CustomerList.filter((searchid) => { return Object.values(searchid)[0] != id });
  }

  /* This will trigger on customer card selection */
  selectedCustomer(customer) {
    this.emitCustomer.emit(customer)
  }
}