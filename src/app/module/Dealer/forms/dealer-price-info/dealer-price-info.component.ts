import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { AppUrl } from "src/app/config/api";
import { SmartFormComponent } from "src/app/common/smart-form/smart-form.component";
import { DealerPriceInfoService } from "src/app/Services/Dealer/DealerPriceInfo/dealer-price-info.service";

@Component({
  selector: 'app-dealer-price-info',
  templateUrl: './dealer-price-info.component.html',
  styleUrls: ['./dealer-price-info.component.css']
})
export class DealerPriceInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public priceList;
  @ViewChild(SmartFormComponent, { static: false }) smartFormComponent: SmartFormComponent;

  constructor(
    private _DealerPriceInfoService: DealerPriceInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_DealerPriceInfo";
    delete Data["CategoryID"];
    delete Data["ProductName"];
    this._DealerPriceInfoService.AddDealerPrice(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Price saved successfully !");
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._DealerPriceInfoService.GetDealerPrice(this.getRequestBody()).subscribe({
      next: data => {
        this.priceList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_DealerPriceInfo"
    }
  }

  public changeEmit(obj) {
    if (obj?.field?.fieldName === "CategoryID") {
      this.loadProductList(obj);
    }
    else if (obj?.field?.fieldName === "ProductID") {
      this.setGST(obj);
    }
  }

  public loadProductList(obj) {
    const field = this.formField.filter(f => f.fieldName === "ProductID")?.[0];
    field.listData.fetchURL = AppUrl.API.get_product_info;
    field.listData.requestBody = {
      MethodName: "Search_ProductInfo",
      CategoryID: obj.value
    }
    this.smartFormComponent.loadListData(field);
    if (this.smartFormComponent.isAdd) {
      this.smartFormComponent.manuallySetValue({ fieldName: 'ProductID', defaultValue: "" });
    }
  }

  public setGST(obj) {
    const field = this.formField.filter(f => f.fieldName === "ProductID")?.[0];
    const productData = this.smartFormComponent?.[field?.fieldName + 'List']?.filter(product => product?.ProductID == obj?.value)?.[0];
    const CGST = productData?.CGST;
    const SGST = productData?.SGST;
    const IGST = productData?.IGST;
    if (this.smartFormComponent.isAdd) {
      this.smartFormComponent.manuallySetValue({ fieldName: 'CGST', defaultValue: CGST });
      this.smartFormComponent.manuallySetValue({ fieldName: 'SGST', defaultValue: SGST });
      this.smartFormComponent.manuallySetValue({ fieldName: 'IGST', defaultValue: IGST });
    }
  }

}
