import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { PurchaseInfoService } from "src/app/Services/PurchaseInfo/purchase-info.service";
import { IPurchaseProductObject, generatePostRequestBody } from "./fields.";
import { APPLICABLE_GST_TYPE, Constant } from "src/app/config/constants";

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnInit {
  PurchaseInfoForm: FormGroup;
  public purchaseProductList: any = new Array();
  public serialNoList: any = new Array();
  public partyList: any;
  public categoryList: any;
  public productList: any;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isPartyInfoSlideIn: boolean = false;
  public selectedParty: any;
  public btnChoosePartyText = Constant.CHOOSE_PARTY;
  @ViewChild("scanControl") scanControl: ElementRef;
  @ViewChild("priceControl") priceControl: ElementRef;
  public basicGST: any;
  public withOrWithoutGST = Constant.WITH_OR_WITHOUT_GST;

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
    this.getSelectedOrAdddedParty();
    this.edit();
    this.getGST();
  }


  getGST() {
    this._sharedDataService.getGST(this.getGSTRequestBody()).subscribe({
      next: data => {
        this.basicGST = data?.[0];
        this.PurchaseInfoForm.get("GSTMode")?.setValue(data?.[0]?.GSTMode);
      },
      error: error => {
      }
    });
  }

  getGSTRequestBody() {
    return {
      MethodName: "Search_BasicGST",
      GSTType: 'P'
    }
  }

  purchaseInfoFormBuilder() {
    this.PurchaseInfoForm = this._FormBuilder.group({
      PurchaseID: [""],
      GSTMode: ["", Validators.required],
      PartyID: ["", Validators.required],
      PurchaseDate: [this._sharedDataService?.currentUser?.todaysDate, Validators.required],
      BillNo: ["", Validators.required],
      TotalQuantity: [{ value: 0, disabled: true }],
      TotalAmount: [{ value: 0, disabled: true }],
      TotalPaidAmount: [0],
      PendingAmount: [{ value: 0, disabled: true }],
      purchaseProductInfo: this._FormBuilder.group(
        {
          PurchaseID: [""],
          CategoryID: [""],
          ProductID: [""],
          SerialNo: [""],
          Price: [],
          PurchasePrice: [],
          Quantity: [{ value: 0, disabled: true }],
          TotalAmount: [{ value: 0, disabled: true }],
          CGST: [""],
          CGSTAmount: [{ value: "", disabled: true }],
          SGST: [""],
          SGSTAmount: [{ value: "", disabled: true }],
          IGST: [""],
          IGSTAmount: [{ value: "", disabled: true }],
          TotalGSTAmount: [],
          TotalCGSTAmount: [],
          TotalSGSTAmount: [],
          TotalIGSTAmount: []
        }
      ),
      PurchaseProductList: [Validators.required],
      Print: [false],
      CGSTAmount: [{ value: 0, disabled: true }],
      SGSTAmount: [{ value: 0, disabled: true }],
      IGSTAmount: [{ value: 0, disabled: true }],
      ApplicableGSTType: [APPLICABLE_GST_TYPE.I],
      TotalTaxableAmount: [{ value: 0, disabled: true }],
    });
  }

  /* This will trigger when add party or select party using subject */
  getSelectedOrAdddedParty() {
    this._sharedDataService.getSelectedParty.subscribe(res => {
      this.showPartyModel(res);

      if (!["", undefined, null].includes(res?.GSTNo)) {
        const StateCode = res?.GSTNo?.substring(0, 2);
        this.PurchaseInfoForm.get("ApplicableGSTType")?.setValue(
          StateCode === this.basicGST.StateCode ? APPLICABLE_GST_TYPE.C : APPLICABLE_GST_TYPE.I
        )
        this.onWithOrWithoutGSTChange();
        this.updateTotalValues();
      }
    });
  }

  showPartyModel(res) {
    this.selectedParty = res;
    this.PurchaseInfoForm.get("PartyID")?.setValue(res?.PartyID);
    this.showPartyInfoSlideIn(false);

    this.btnChoosePartyText = this.selectedParty?.PartyName;
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
  Submit() {
    this.showLoader = true;
    this._purchaseInfoService.AddPurchase(generatePostRequestBody(this.PurchaseInfoForm.getRawValue(), this.isAdd ? "0" : "1")).subscribe({
      next: data => {
        this.showLoader = false;
        this._sharedDataService.success("Purchase saved successfully !");
        this.printPurchaseInvoice(data);
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
    let purchaseProductInfoData = this.PurchaseInfoForm.get("purchaseProductInfo")?.getRawValue();
    const isValid = this.checkPurchaseProductInfoValidation(purchaseProductInfoData);
    if (isValid) {
      this.AddPurchaseProduct(purchaseProductInfoData);
    }
  }
  /* This will create array based on Serial no input string, in which you have comma seperated serial no */
  separateSerialNo(event) {
    this.isValidSerialNo();
  }
  /* funtion will check is the serial no valid to add menas is it already purchased */
  isValidSerialNo() {
    let serialNo = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.SerialNo;
    if ([undefined, "", null].includes(serialNo)) {
      return;
    }
    const separateByComma = serialNo?.replace(/,\s*$/, "")?.replace(/\s/g, "");
    let separateByCommaArray = serialNo?.replace(/,\s*$/, "")?.replace(/\s/g, "")?.split(',');

    const checkAlreadyAdded = this.serialNoList.filter((item) => separateByCommaArray.includes(item));

    if (checkAlreadyAdded?.length > 0) {
      this._sharedDataService.NotieError(`These Serial No's ${checkAlreadyAdded?.join(",")} are already added`);
      separateByCommaArray = separateByCommaArray?.filter((item) => !checkAlreadyAdded?.includes(item));
    }

    this._purchaseInfoService.checkSerailNoIsValid(this.isValidSerialNoRequestBody(separateByComma)).subscribe({
      next: data => {
        if (data?.length > 0) {
          data = data.map(item => item = item?.SerialNo);

          this._sharedDataService.NotieError(`These Serial No's ${data?.join(",")} are already exists`);

          separateByCommaArray = separateByCommaArray?.filter((item) => !data?.includes(item));
        }

        if (separateByCommaArray?.length > 0) {
          this.serialNoList = [...this.serialNoList, ...separateByCommaArray];
          this.calculatePurchaseProductTotal();
        }
        if (serialNo?.length > 0) {
          this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SerialNo")?.setValue("");
          this.scanControl.nativeElement.focus();
        }
        else {
          this.priceControl.nativeElement.focus();
        }

      },
      error: error => {
      }
    });
  }
  /* request body for category list dropdown api call */
  public isValidSerialNoRequestBody(separateByComma) {
    return {
      MethodName: "Sel_SerialNo_ForPurchase",
      SerialNo: separateByComma,
      Mode: "0",
      PurchaseID: this.PurchaseInfoForm.get("PurchaseID")?.value
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
    if (["", null, undefined].includes(this.PurchaseInfoForm.get("PartyID")?.value)) {
      this._sharedDataService.NotieError("Please choose party");
      return false;
    } else if (["", null, undefined].includes(data.CategoryID)) {
      this._sharedDataService.NotieError("Please select category");
      return false;
    } else if (["", null, undefined].includes(data.ProductID)) {
      this._sharedDataService.NotieError("Please select product");
      return false;
    } else if (this.serialNoList?.length === 0) {
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
    let CGSTAmount = 0;
    let SGSTAmount = 0;
    let IGSTAmount = 0;
    let TotalTaxableAmount = 0;

    TotalQuantity = this.purchaseProductList?.reduce((n, { Quantity }) => n + Quantity, 0);
    TotalAmount = this.purchaseProductList?.reduce((n, { TotalAmount }) => (n) + parseFloat(TotalAmount), 0);
    TotalPaidAmount = this.PurchaseInfoForm.get("TotalPaidAmount")?.value || 0;
    PendingAmount = TotalAmount - TotalPaidAmount;

    if (this.PurchaseInfoForm.get("GSTMode")?.value === "G" && this.PurchaseInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.C) {
      CGSTAmount = this.purchaseProductList?.reduce((n, { TotalCGSTAmount }) => (n) + parseFloat(TotalCGSTAmount), 0);
      SGSTAmount = this.purchaseProductList?.reduce((n, { TotalSGSTAmount }) => (n) + parseFloat(TotalSGSTAmount), 0);
    }
    else if (this.PurchaseInfoForm.get("GSTMode")?.value === "G" && this.PurchaseInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.I) {
      IGSTAmount = this.purchaseProductList?.reduce((n, { TotalIGSTAmount }) => (n) + parseFloat(TotalIGSTAmount), 0);
    }

    TotalTaxableAmount = (CGSTAmount ?? 0) + (SGSTAmount ?? 0) + (IGSTAmount ?? 0);

    this.PurchaseInfoForm.patchValue({
      TotalQuantity: TotalQuantity,
      TotalAmount: TotalAmount,
      PendingAmount: PendingAmount,
      CGSTAmount: CGSTAmount,
      SGSTAmount: SGSTAmount,
      IGSTAmount: IGSTAmount,
      TotalTaxableAmount: TotalTaxableAmount

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
    this.removeSelectedParty();
    this.PurchaseInfoForm.get("PurchaseDate")?.setValue(this._sharedDataService?.currentUser?.todaysDate);
    this.PurchaseInfoForm.get("GSTMode")?.setValue(this.basicGST?.GSTMode);
    this.PurchaseInfoForm.get("ApplicableGSTType")?.setValue(APPLICABLE_GST_TYPE.C);
  }

  /* function to show party info componet in slide in on cick of choose party button  */
  showPartyInfoSlideIn(isShow) {
    this.isPartyInfoSlideIn = isShow;
  }

  /* remove selected party  */
  removeSelectedParty() {
    this.selectedParty = null;
    this.btnChoosePartyText = Constant.CHOOSE_PARTY;
  }
  /* this function will trigger when click on edit button on purchase info search page */
  edit() {
    this._sharedDataService.purchaseInfoEdit.subscribe(item => {
      this.purchaseProductList = [];
      this.showPartyModel(item?.PartyInfo);
      this.PurchaseInfoForm.patchValue(item);

      this.isAdd = false;
      this.PurchaseInfoForm.get("PartyID")?.setValue(item?.PartyInfo?.PartyID);

      let SerialNo: any = [];

      item?.PurchaseProductInfo?.forEach(prod => {
        item?.PurchaseProductInfo?.forEach(serial => {
          if (prod.ProductID == serial.ProductID && !SerialNo.includes(serial.SerialNo)) {
            SerialNo.push(serial.SerialNo);
          }
        });
        prod.Quantity = SerialNo?.length;
        prod.SerialNoList = SerialNo;
        prod.SerialNo = SerialNo?.join(",");
        SerialNo = [];
      });


      item?.PurchaseProductInfo.forEach(prod => {
        const isExists = this.purchaseProductList.filter(p => p.ProductID === prod.ProductID);
        if (isExists.length == 0) {
          this.purchaseProductList.push(prod);
        }
      })
      this.PurchaseInfoForm.get("PurchaseProductList")?.setValue(this.purchaseProductList);
      this.updateTotalValues();
    });
  }

  /* print recently submited purchase */

  printPurchaseInvoice(data) {
    if (this.PurchaseInfoForm.get("Print")?.value) {
      this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_PurchaseInfo&PurchaseID=" + data?.[0]?.PurchaseID);
    }
  }

  /* function will trigger on product slection to get purchase price */

  setPurchasePrice() {
    let ProductID = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.ProductID;
    let selectProduct = this.productList.filter(prod => prod.ProductID == ProductID);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Price")?.setValue(selectProduct?.[0]?.PurchasePrice);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGST")?.setValue(selectProduct?.[0]?.CGST);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGST")?.setValue(selectProduct?.[0]?.SGST);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGST")?.setValue(selectProduct?.[0]?.IGST);
    this.calculatePurchaseProductTotal();
  }

  calculatePurchaseProductTotal() {
    let purchaseAmount = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.Price ?? 0;
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Quantity")?.setValue(this.serialNoList?.length);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalAmount")?.setValue(this.serialNoList?.length * purchaseAmount);
    this.calculateGST();
  }

  onWithOrWithoutGSTChange() {
    this.calculateGST();
  }

  calculateGST() {
    const GSTMode = this.PurchaseInfoForm.get("GSTMode")?.value;
    const ApplicableGSTType = this.PurchaseInfoForm.get("ApplicableGSTType")?.value;
    const Price = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Price")?.value ?? 0;

    const CGST = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGST")?.value ?? 0;
    const SGST = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGST")?.value ?? 0;
    const IGST = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGST")?.value ?? 0;
    let CGSTAmount = 0;
    let SGSTAmount = 0;
    let IGSTAmount = 0;
    let PurchasePrice = 0;
    let TotalGSTAmount = 0;
    let Quantity = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Quantity")?.value ?? 0;
    let TotalCGSTAmount = 0;
    let TotalSGSTAmount = 0;
    let TotalIGSTAmount = 0;

    if (GSTMode === 'W') {
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGSTAmount")?.setValue(0);
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGSTAmount")?.setValue(0);
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGSTAmount")?.setValue(0);
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalGSTAmount")?.setValue(0);
    }
    else {
      if (ApplicableGSTType === APPLICABLE_GST_TYPE.C) {
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGST")?.setValue(0);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGSTAmount")?.setValue(0);
        CGSTAmount = (((Price ?? 0) * (CGST ?? 0)) / 100);
        SGSTAmount = (((Price ?? 0) * (SGST ?? 0)) / 100);
        PurchasePrice = (Price ?? 0) - (CGSTAmount ?? 0) - (SGSTAmount ?? 0);
        TotalCGSTAmount = ((CGSTAmount ?? 0)) * Quantity;
        TotalSGSTAmount = ((SGSTAmount ?? 0)) * Quantity;
        TotalGSTAmount = ((CGSTAmount ?? 0) + (SGSTAmount ?? 0)) * Quantity;
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGSTAmount")?.setValue(CGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGSTAmount")?.setValue(SGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalCGSTAmount")?.setValue(TotalCGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalSGSTAmount")?.setValue(TotalSGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("PurchasePrice")?.setValue(PurchasePrice);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalGSTAmount")?.setValue(TotalGSTAmount);

      }
      else {
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGSTAmount")?.setValue(0);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGSTAmount")?.setValue(0);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGST")?.setValue(0);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGST")?.setValue(0);
        IGSTAmount = (((Price ?? 0) * (IGST ?? 0)) / 100);
        PurchasePrice = (Price ?? 0) - (IGSTAmount ?? 0);
        TotalIGSTAmount = ((IGSTAmount ?? 0)) * Quantity;
        TotalGSTAmount = ((IGSTAmount ?? 0)) * Quantity;
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGSTAmount")?.setValue(IGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("PurchasePrice")?.setValue(PurchasePrice);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalGSTAmount")?.setValue(TotalGSTAmount);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalIGSTAmount")?.setValue(TotalIGSTAmount);
      }
      this.updateTotalValues();
    }
  }
}
