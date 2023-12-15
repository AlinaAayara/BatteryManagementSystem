import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { PurchaseInfoService } from "src/app/Services/PurchaseInfo/purchase-info.service";
import { IPurchaseProductObject, generatePostRequestBody } from "./fields.";

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnInit {
  PurchaseInfoForm: FormGroup;
  PurchaseProductInfoForm: FormGroup;
  public purchaseProductList: any = new Array();
  public serialNoList: any = new Array();
  public partyList: any;
  public categoryList: any;
  public productList: any;
  public isAdd: boolean = true;
  public showLoader: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _purchaseInfoService: PurchaseInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.purchaseInfoFormBuilder();
    this.getPartyList();
    this.getCategoryList();
  }

  purchaseInfoFormBuilder() {
    this.PurchaseInfoForm = this._FormBuilder.group({
      PurchaseID: [""],
      PartyID: ["", Validators.required],
      PurchaseDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      BillNo: ["", Validators.required],
      TotalQuantity: [0],
      TotalAmount: [0],
      TotalPaidAmount: [""],
      PendingAmount: [0],
      purchaseProductInfo: this._FormBuilder.group(
        {
          PurchaseID: [""],
          CategoryID: [""],
          ProductID: [""],
          SerialNo: [""],
          Price: [],
          Quantity: [{ value: 0, disabled: true }]
        }
      ),
      PurchaseProductList: [Validators.required]
    });
  }

  /* get party list to show dropwon */
  getPartyList() {
    this._purchaseInfoService.getPartyList(this.getPartyListRequestBody()).subscribe({
      next: data => {
        this.partyList = data;
      },
      error: error => {
        this.partyList = [];
      }
    });
  }

  /* get category list to show dropwon */
  getCategoryList() {
    this._purchaseInfoService.getCategoryList(this.getCategoryListRequestBody()).subscribe({
      next: data => {
        this.categoryList = data;
      },
      error: error => {
        this.categoryList = [];
      }
    });
  }

  /* get product list to show dropwon */
  getProductList() {
    let CategoryID = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.CategoryID;
    if (["", undefined, null].includes(CategoryID)) {
      return;
    }
    this._purchaseInfoService.getProductList(this.getProductListRequestBody(CategoryID)).subscribe({
      next: data => {
        this.productList = data;
      },
      error: error => {
        this.productList = [];
      }
    });
  }
  /* request body for product list dropdown api call */
  public getProductListRequestBody(CategoryID) {
    return {
      CategoryID: CategoryID,
      MethodName: "Sel_ProductInfo_ByID"
    }
  }
  /* request body for category list dropdown api call */
  public getCategoryListRequestBody() {
    return {
      MethodName: "Search_BasicCategory"
    }
  }
  /* request body for party list dropdown api call */
  public getPartyListRequestBody() {
    return {
      MethodName: "Search_PartyInfo"
    }
  }

  /* This will trigger On final save button  */
  Submit(e) {
    this.showLoader = true;
    this._purchaseInfoService.AddPurchase(generatePostRequestBody(this.PurchaseInfoForm.value)).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Purchase saved successfully !");
        this.clearPurchase();
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });

  }
  /* This will trigger On Add Product button. It will insert into Array */
  SubmitPurchaseProduct() {
    let purchaseProductInfoData = this.PurchaseInfoForm.get("purchaseProductInfo")?.value;
    const isValid = this.checkPurchaseProductInfoValidation(purchaseProductInfoData);
    if (isValid) {
      this.AddPurchaseProduct(purchaseProductInfoData);
    }
  }
  /* This will create array based on Serial no input string, in which you have comma seperated serial no */
  separateSerialNo() {
    let serialNo = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.SerialNo;
    if (serialNo?.length > 0) {
      this.serialNoList = serialNo?.replace(/,\s*$/, "")?.split(',');
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Quantity")?.setValue(this.serialNoList?.length);
    }
  }
  /* This will add product object into array and clear the product from controls (child) */
  AddPurchaseProduct(purchaseProductInfoData) {
    purchaseProductInfoData.ProductName = this.productList?.filter(prod => prod?.ProductID == this.PurchaseInfoForm?.get("purchaseProductInfo")?.value?.ProductID)?.[0]?.ProductName;
    purchaseProductInfoData.Quantity = this.serialNoList?.length;
    purchaseProductInfoData.SerialNoList = this.serialNoList;
    this.purchaseProductList.push(purchaseProductInfoData);
    this.PurchaseInfoForm.get("PurchaseProductList")?.setValue(this.purchaseProductList);
    this.clearPurchaseProduct();
    this.updateTotalValues();
  }

  /* Manual validation on add button click(child) */
  checkPurchaseProductInfoValidation(data) {
    if (["", null, undefined].includes(data.CategoryID)) {
      this._sharedDataService.NotieError("Please select category");
      return false;
    } else if (["", null, undefined].includes(data.ProductID)) {
      this._sharedDataService.NotieError("Please select product");
      return false;
    } else if (["", null, undefined].includes(data.SerialNo)) {
      this._sharedDataService.NotieError("Please enter / scan serial no");
      return false;
    } else if (["", null, undefined].includes(data.Price)) {
      this._sharedDataService.NotieError("Please enter price");
      return false;
    }
    return true;
  }

  /* update purchase total values like totalAmount, Total Quanity etc. on product addition , deletion  and on Paid Amount change*/
  updateTotalValues() {
    let TotalQuantity = 0;
    let TotalAmount = 0;
    let TotalPaidAmount = 0;
    let PendingAmount = 0;

    TotalQuantity = this.purchaseProductList?.reduce((n, { Quantity }) => n + Quantity, 0);
    TotalAmount = this.purchaseProductList?.reduce((n, { Price }) => (n) + parseFloat(Price), 0);
    TotalPaidAmount = this.PurchaseInfoForm.get("TotalPaidAmount")?.value || 0;
    PendingAmount = TotalAmount - TotalPaidAmount;

    this.PurchaseInfoForm.patchValue({
      TotalQuantity: TotalQuantity,
      TotalAmount: TotalAmount,
      PendingAmount: PendingAmount
    })

  }

  /* remove item from list it will trigger from front end purchase product table upon click on delete button */
  removePurchaseProduct(item) {
    this.purchaseProductList = this.purchaseProductList?.filter((itm) => item != itm);
    this.PurchaseInfoForm.get("PurchaseProductList")?.setValue(this.purchaseProductList);
    this.clearPurchaseProduct();
    this.updateTotalValues();
  }


  /* clear purchase product form after add and delete */
  clearPurchaseProduct() {
    this.PurchaseInfoForm.get("purchaseProductInfo")?.reset();
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("ProductID")?.setValue("");
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CategoryID")?.setValue("");
    this.serialNoList = [];
  }
  /* clear purchase whole form on save or on clear */
  clearPurchase() {
    this.PurchaseInfoForm.reset();
    this.clearPurchaseProduct();
    this.purchaseProductList = [];
    this.isAdd = true;
    this.showLoader = false;
  }
}
