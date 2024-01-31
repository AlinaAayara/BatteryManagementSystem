import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { DistributorInfoService } from "src/app/Services/Manufacturer/DistributorInfo/distributor-info.service";
import { BASICGROUP } from "src/app/config/constants";

@Component({
  selector: 'app-distributor-info',
  templateUrl: './distributor-info.component.html',
  styleUrls: ['./distributor-info.component.css']
})
export class DistributorInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public distributorList;
  constructor(
    private _distributorInfoService: DistributorInfoService,
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
    this._distributorInfoService.AddUser(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Distributor created successfully with Username = "+data?.[0]?.UserName+" and Password ="+data?.[0]?.Password);
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._distributorInfoService.GetUser(this.getRequestBody()).subscribe({
      next: data => {
        this.distributorList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicUser",
      GroupID: BASICGROUP.Distributor
    }
  }
  /* This function will emit added distributor or seleceted distributor
    1) This will used during purchase info
  */
    emitDistributor(Distributor) {
      this._sharedDataService.getSelectedDistributor.next(Distributor);
    }
}
