import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { ActivatedRoute } from "@angular/router";
import { Constant } from "src/app/config/constants";
import { PartyInfoService } from "src/app/Services/PartyInfo/party-info.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-party-search',
  templateUrl: './party-search.component.html',
  styleUrls: ['./party-search.component.css']
})
export class PartySearchComponent implements OnInit {
  public PartyList;
  public showLoader: boolean = false;
  public PartyName = "";
  public id;
  public isWrite: boolean = false;
  public isDelete: boolean = false;
  Object = Object;
  @Output() public emitParty = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private _partyInfoService: PartyInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isWrite = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISWRITE);
    this.isDelete = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISDELETE);
    this.searchParty();
  }

  searchParty() {
    this._partyInfoService.GetParty(this.getRequestBody()).subscribe({
      next: data => {
        this.PartyList = data;
      },
      error: error => {
        this.PartyList = [];
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_PartyInfo",
      PartyName: [null, undefined, ""].includes(this.PartyName) ? "" : this.PartyName
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
    this.PartyList = this.PartyList.filter((searchid) => { return Object.values(searchid)[0] != id });
  }

  /* This will trigger on party card selection */
  selectedParty(party) {
    this.emitParty.emit(party)
  }
}
