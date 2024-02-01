import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { ActivatedRoute } from "@angular/router";
import { BASICGROUP, Constant } from "src/app/config/constants";
import Swal from "sweetalert2";
import { DealerInfoService } from "src/app/Services/Distributor/DealerInfo/dealer-info.service";

@Component({
  selector: 'app-dealer-search',
  templateUrl: './dealer-search.component.html',
  styleUrls: ['./dealer-search.component.css']
})
export class DealerSearchComponent implements OnInit {
  public DealerList;
  public showLoader: boolean = false;
  public Name = "";
  public id;
  public isWrite: boolean = false;
  public isDelete: boolean = false;
  Object = Object;
  @Output() public emitDealer = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private _DealerInfoService: DealerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isWrite = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISWRITE);
    this.isDelete = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISDELETE);
    this.searchDealer();
  }

  searchDealer() {
    this._DealerInfoService.GetUser(this.getRequestBody()).subscribe({
      next: data => {
        this.DealerList = data;
      },
      error: error => {
        this.DealerList = [];
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicUser",
      GroupID: BASICGROUP.Dealer,
      Name: [null, undefined, ""].includes(this.Name) ? "" : this.Name
    }
  }
  deleteItem(item) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
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
    this._sharedDataService.partyInfoEdit.next(item);
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
    this.DealerList = this.DealerList.filter((searchid) => { return Object.values(searchid)[0] != id });
  }

  /* This will trigger on party card selection */
  selectedDealer(party) {
    this.emitDealer.emit(party)
  }
}
