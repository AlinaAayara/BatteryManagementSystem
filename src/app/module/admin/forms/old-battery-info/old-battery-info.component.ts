import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { CustomerInfoService } from "src/app/Services/CustomerInfo/customer-info.service";
import { OldBatteryInfoService } from "src/app/Services/OldBatteryInfo/old-battery-info.service";

@Component({
  selector: 'app-old-battery-info',
  templateUrl: './old-battery-info.component.html',
  styleUrls: ['./old-battery-info.component.css']
})
export class OldBatteryInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public oldBatteryList;
  public showLoader: boolean = false;

  constructor(
    private _oldBatteryInfoService: OldBatteryInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.showLoader = true;
    this.manuallyClearField = false;
    Data.MethodName = "InUp_OldBatteryInfo";
    this._oldBatteryInfoService.AddOldBattery(Data).subscribe({
      next: res => {
        this._sharedDataService.success("Old Battery saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        this.showLoader = false;
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._oldBatteryInfoService.GetOldBattery(this.getRequestBody()).subscribe({
      next: data => {
        this.oldBatteryList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_OldBatteryInfo"
    }
  }
}
