import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { BASICGROUP } from "src/app/config/constants";
import { DealerInfoService } from "src/app/Services/Distributor/DealerInfo/dealer-info.service";

@Component({
  selector: 'app-dealer-info',
  templateUrl: './dealer-info.component.html',
  styleUrls: ['./dealer-info.component.css']
})
export class DealerInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public dealerList;
  constructor(
    private _DealerInfoService: DealerInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BasicUser";
    this._DealerInfoService.AddUser(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Dealer created successfully with Username = " + data?.[0]?.UserName + " and Password =" + data?.[0]?.Password);
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._DealerInfoService.GetUser(this.getRequestBody()).subscribe({
      next: data => {
        this.dealerList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicUser",
      GroupID: BASICGROUP.Dealer
    }
  }
  /* This function will emit added Dealer or seleceted Dealer
      1) This will used during purchase info
    */
  emitDealer(Dealer) {
    this._sharedDataService.getSelectedDistributor.next(Dealer);
  }
}
