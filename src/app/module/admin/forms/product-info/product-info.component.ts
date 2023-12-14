import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public productList;
  constructor(
    private _productInfoService: ProductInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_ProductInfo";
    this._productInfoService.AddProduct(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Product saved successfully !");
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._productInfoService.GetProduct(this.getRequestBody()).subscribe({
      next: data => {
        this.productList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_ProductInfo"
    }
  }

}
