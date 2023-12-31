import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { BasicAmpService } from "src/app/Services/BasicAmp/basic-amp.service";

@Component({
  selector: 'app-basic-amp',
  templateUrl: './basic-amp.component.html',
  styleUrls: ['./basic-amp.component.css']
})
export class BasicAmpComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public ampList;
  constructor(
    private _BasicAmpService: BasicAmpService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BasicAmp";
    this._BasicAmpService.AddAmp(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Saved successfully !");
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._BasicAmpService.GetAmp(this.getRequestBody()).subscribe({
      next: data => {
        this.ampList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicAmp"
    }
  }

}
