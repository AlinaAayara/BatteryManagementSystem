import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductInfoService } from "src/app/Services/ProductInfo/product-info.service";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { PurchaseInfoService } from "src/app/Services/PurchaseInfo/purchase-info.service";
import { APPLICABLE_GST_TYPE, Constant, USER_TYPES } from "src/app/config/constants";
import { generatePostRequestBody } from "./fields";

@Component({
  selector: 'app-purchase-info-common',
  templateUrl: './purchase-info-common.component.html',
  styleUrls: ['./purchase-info-common.component.css']
})
export class PurchaseInfoCommonComponent implements OnInit, OnChanges {
  PurchaseInfoForm: FormGroup;
  public purchaseProductList: any = new Array();
  public serialNoList: any = new Array();
  public partyList: any;
  public categoryList: any;
  public productList: any;
  public isAdd: boolean = true;
  public showLoader: boolean = false;
  public isSlideIn: boolean = false;
  public selectedParty: any;
  @Input() public btnChoosePartyText = Constant.CHOOSE_PARTY;
  @ViewChild("scanControl") scanControl: ElementRef;
  @ViewChild("priceControl") priceControl: ElementRef;
  public basicGST: any;
  public withOrWithoutGST = Constant.WITH_OR_WITHOUT_GST;
  public isTCS = Constant.YES_OR_NO; c
  public defaultTCS = Constant.DEFAULT_TCS;
  @Input() public userType;

  constructor(
    private _FormBuilder: FormBuilder,
    private _purchaseInfoService: PurchaseInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['userType']) {
      this.userType = changes['userType']?.currentValue;
      this.setPartyIDZero();
    }
  }
  ngOnInit(): void {
    this.purchaseInfoFormBuilder();
    this.getCategoryList();
    this.getSelectedOrAdddedParty();
    this.getSelectedOrAdddedDistributor();
    this.edit();
    this.getGST();
    this.setPartyIDZero();
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
      PurchaseProductList: [Validators.required],
      Print: [false],
      CGSTAmount: [{ value: 0, disabled: true }],
      SGSTAmount: [{ value: 0, disabled: true }],
      IGSTAmount: [{ value: 0, disabled: true }],
      ApplicableGSTType: [APPLICABLE_GST_TYPE.I],
      TotalTaxableAmount: [{ value: 0, disabled: true }],
      IsTCSApplicable: ["0", Validators.required],
      TCS: [this.defaultTCS],
      TCSAmount: [{ value: 0, disabled: true }],
      TotalDiscountAmount: [{ value: 0, disabled: true }],
      FinalAmount: [{ value: 0, disabled: true }],
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
          CGST: ["0"],
          CGSTAmount: [{ value: "0", disabled: true }],
          SGST: ["0"],
          SGSTAmount: [{ value: "0", disabled: true }],
          IGST: ["0"],
          IGSTAmount: [{ value: "0", disabled: true }],
          TotalGSTAmount: [],
          TotalCGSTAmount: [],
          TotalSGSTAmount: [],
          TotalIGSTAmount: [],
          Discount: ["0"],
          DiscountAmount: [{ value: "0", disabled: true }],
          TotalDiscountAmount: [{ value: "0", disabled: true }]
        }
      )
    });
  }
  /* as for manufacturer purchase dont require party so making it as zero */
  setPartyIDZero() {
    if (this.userType === USER_TYPES.Manufacturer) {
      this.PurchaseInfoForm?.get("PartyID")?.setValue(0);
    }
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
        this.setPurchasePrice();
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

  /* This will trigger when add distributor or select distributor using subject */
  getSelectedOrAdddedDistributor() {
    this._sharedDataService.getSelectedDistributor.subscribe(res => {
      this.showDistributorModel(res);

      if (!["", undefined, null].includes(res?.GSTNo)) {
        const StateCode = res?.GSTNo?.substring(0, 2);
        this.PurchaseInfoForm.get("ApplicableGSTType")?.setValue(
          StateCode === this.basicGST.StateCode ? APPLICABLE_GST_TYPE.C : APPLICABLE_GST_TYPE.I
        )
        this.setPurchasePrice();
        this.onWithOrWithoutGSTChange();
        this.updateTotalValues();
      }
    });
  }

  showDistributorModel(res) {
    this.selectedParty = res;
    this.PurchaseInfoForm.get("PartyID")?.setValue(res?.UserID);
    console.log("UserID", this.PurchaseInfoForm.get("PartyID")?.value)
    this.showPartyInfoSlideIn(false);

    this.btnChoosePartyText = this.selectedParty?.Name;
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
    if (["", null, undefined].includes(this.PurchaseInfoForm.get("PartyID")?.value) && this.userType != USER_TYPES.Manufacturer) {
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
    let TotalDiscountAmount = 0;
    let FinalAmount = 0;
    let TCSAmount = 0;

    TotalQuantity = this.purchaseProductList?.reduce((n, { Quantity }) => n + Quantity, 0);
    TotalAmount = Number((this.purchaseProductList?.reduce((n, { TotalAmount }) => (n) + parseFloat(TotalAmount), 0)).toFixed(2));
    TotalDiscountAmount = Number((this.purchaseProductList?.reduce((n, { TotalDiscountAmount }) => (n) + parseFloat(TotalDiscountAmount), 0)).toFixed(2));
    TotalPaidAmount = parseFloat(this.PurchaseInfoForm.get("TotalPaidAmount")?.value ?? 0);
    PendingAmount = Number((TotalAmount - TotalPaidAmount).toFixed(2));
    TCSAmount = this.PurchaseInfoForm.get("IsTCSApplicable")?.value == "1" ? Number((this.PurchaseInfoForm.get("TCSAmount")?.value ?? 0).toFixed(2)) : 0;
    if (this.PurchaseInfoForm.get("GSTMode")?.value === "G" && this.PurchaseInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.C) {
      CGSTAmount = Number((this.purchaseProductList?.reduce((n, { TotalCGSTAmount }) => (n) + parseFloat(TotalCGSTAmount), 0)).toFixed(2));
      SGSTAmount = Number((this.purchaseProductList?.reduce((n, { TotalSGSTAmount }) => (n) + parseFloat(TotalSGSTAmount), 0)).toFixed(2));
    }
    else if (this.PurchaseInfoForm.get("GSTMode")?.value === "G" && this.PurchaseInfoForm.get("ApplicableGSTType")?.value === APPLICABLE_GST_TYPE.I) {
      IGSTAmount = Number((this.purchaseProductList?.reduce((n, { TotalIGSTAmount }) => (n) + parseFloat(TotalIGSTAmount), 0)).toFixed(2));
    }

    TotalTaxableAmount = Number(((CGSTAmount ?? 0) + (SGSTAmount ?? 0) + (IGSTAmount ?? 0)).toFixed(2));
    FinalAmount = (TotalTaxableAmount ?? 0) + TotalAmount + TCSAmount;


    this.PurchaseInfoForm.patchValue({
      TotalQuantity: TotalQuantity,
      TotalAmount: TotalAmount,
      PendingAmount: PendingAmount,
      CGSTAmount: CGSTAmount,
      SGSTAmount: SGSTAmount,
      IGSTAmount: IGSTAmount,
      TotalTaxableAmount: TotalTaxableAmount,
      TotalDiscountAmount: TotalDiscountAmount,
      FinalAmount: FinalAmount

    })
    this.onIsTCSApplicable();
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
    this.PurchaseInfoForm.get("IsTCSApplicable")?.setValue("0");
    this.PurchaseInfoForm.get("TCS")?.setValue(this.defaultTCS);

    if(this.userType === USER_TYPES.Manufacturer){
      this.setPartyIDZero();
    }
  }

  /* function to show party info componet in slide in on cick of choose party button  */
  showPartyInfoSlideIn(isShow) {
    this.isSlideIn = isShow;
  }

  /* remove selected party  */
  removeSelectedParty() {
    this.selectedParty = null;
    this.btnChoosePartyText = Constant.CHOOSE_PARTY;
  }
  /* this function will trigger when click on edit button on purchase info search page */
  edit() {
    this._sharedDataService.purchaseInfoEdit.subscribe(item => {
      this.getPurchaseByID(item?.PurchaseID);
      // this.purchaseProductList = [];

      // this.PurchaseInfoForm.patchValue(item);
      // if (this.userType != USER_TYPES.Manufacturer) {
      //   this.showPartyModel(item?.PartyInfo);
      //   this.PurchaseInfoForm.get("PartyID")?.setValue(item?.PartyInfo?.PartyID);
      // }
      // else {
      //   this.PurchaseInfoForm.get("PartyID")?.setValue(0);
      // }
      // this.isAdd = false;


      // let SerialNo: any = [];

      // item?.PurchaseProductInfo?.forEach(prod => {
      //   item?.PurchaseProductInfo?.forEach(serial => {
      //     if (prod.ProductID == serial.ProductID && !SerialNo.includes(serial.SerialNo)) {
      //       SerialNo.push(serial.SerialNo);
      //     }
      //   });
      //   prod.Quantity = SerialNo?.length;
      //   prod.SerialNoList = SerialNo;
      //   prod.SerialNo = SerialNo?.length > 0 ? SerialNo?.join(",") : "";
      //   SerialNo = [];
      // });


      // item?.PurchaseProductInfo.forEach(prod => {
      //   const isExists = this.purchaseProductList.filter(p => p.ProductID === prod.ProductID);
      //   if (isExists.length == 0) {
      //     prod.TotalAmount = Number((prod.Price * prod.Quantity).toFixed(2));
      //     prod.PurchasePrice = prod.Price;
      //     prod.Price = parseFloat(prod.PurchasePrice) + (parseFloat(prod.CGSTAmount ?? 0) + parseFloat(prod.SGSTAmount ?? 0) + parseFloat(prod.IGSTAmount ?? 0)) + parseFloat(prod.DiscountAmount ?? 0);
      //     prod.TotalGSTAmount = Number(((parseFloat(prod.CGSTAmount ?? 0) + parseFloat(prod.SGSTAmount ?? 0) + parseFloat(prod.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
      //     prod.TotalDiscountAmount = Number((parseFloat(prod.DiscountAmount ?? 0) * prod.Quantity).toFixed(2));
      //     prod.TotalCGSTAmount = Number((((prod.CGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
      //     prod.TotalSGSTAmount = Number((((prod.SGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
      //     prod.TotalIGSTAmount = Number((((prod.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
      //     this.purchaseProductList.push(prod);
      //   }
      // })
      // this.PurchaseInfoForm.get("PurchaseProductList")?.setValue(this.purchaseProductList);
      // this.updateTotalValues();
    });
  }

  getPurchaseByID(PurchaseID){
    this._purchaseInfoService.getPurchaseByID(this.getPurchaseByIDRequestBody(PurchaseID)).subscribe({
      next: data => {
        const purchaseData = data;
        this.PurchaseInfoForm.patchValue(purchaseData);
        if (this.userType != USER_TYPES.Manufacturer) {
          this.showPartyModel(purchaseData?.PartyInfo?.[0]);
          this.PurchaseInfoForm.get("PartyID")?.setValue(purchaseData?.PartyInfo?.[0]?.PartyID);
        }
        else {
          this.PurchaseInfoForm.get("PartyID")?.setValue(0);
        }
        this.isAdd = false;
        this.PurchaseInfoForm.get("IsTCSApplicable")?.setValue(purchaseData?.IsTCSApplicable+"");
        purchaseData.ProductInfo.forEach(prod=>{
          prod.SerialNoList = prod?.PurchaseProductInfo?.map(subProd=> subProd?.SerialNo);
          prod.Quantity = prod?.PurchaseProductInfo?.length ?? 0;
          prod.SerialNo = prod.SerialNoList?.join(",");

          prod.TotalAmount = Number((prod?.PurchaseProductInfo?.[0]?.Price * prod.Quantity).toFixed(2));
          prod.PurchasePrice = prod?.PurchaseProductInfo?.[0]?.Price;
          prod.Price = Number((parseFloat(prod?.PurchasePrice) + (parseFloat(prod?.PurchaseProductInfo?.[0]?.CGSTAmount ?? 0) + parseFloat(prod?.PurchaseProductInfo?.[0]?.SGSTAmount ?? 0) + parseFloat(prod?.PurchaseProductInfo?.[0]?.IGSTAmount ?? 0)) + parseFloat(prod?.PurchaseProductInfo?.[0]?.DiscountAmount ?? 0)).toFixed(2));
          prod.TotalGSTAmount = Number(((parseFloat(prod?.PurchaseProductInfo?.[0]?.CGSTAmount ?? 0) + parseFloat(prod?.PurchaseProductInfo?.[0]?.SGSTAmount ?? 0) + parseFloat(prod?.PurchaseProductInfo?.[0]?.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
          prod.TotalDiscountAmount = Number((parseFloat(prod?.PurchaseProductInfo?.[0]?.DiscountAmount ?? 0) * prod.Quantity).toFixed(2));
          prod.TotalCGSTAmount = Number((((prod?.PurchaseProductInfo?.[0]?.CGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
          prod.TotalSGSTAmount = Number((((prod?.PurchaseProductInfo?.[0]?.SGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
          prod.TotalIGSTAmount = Number((((prod?.PurchaseProductInfo?.[0]?.IGSTAmount ?? 0)) * prod.Quantity).toFixed(2));
        });
        this.purchaseProductList = purchaseData?.ProductInfo ?? [];
        this.PurchaseInfoForm.get("PurchaseProductList")?.setValue(purchaseData?.ProductInfo ?? []);
        this.updateTotalValues();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }
  getPurchaseByIDRequestBody(PurchaseID) {
    return {
      "MethodName": "Sel_PurchaseInfo_ByID",
      "PurchaseID": PurchaseID
    }
  }
  /* print recently submited purchase */

  printPurchaseInvoice(data) {
    if (this.PurchaseInfoForm.get("Print")?.value) {
      this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_PurchaseInfo&PurchaseID=" + data?.[0]?.PurchaseID);
    }
  }

  /* function will trigger on product slection and on party selection to get purchase price */

  setPurchasePrice() {
    let ProductID = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.ProductID;
    let selectProduct = this.productList?.filter(prod => prod.ProductID == ProductID);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Price")?.setValue(selectProduct?.[0]?.PurchasePrice);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("CGST")?.setValue(selectProduct?.[0]?.CGST);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("SGST")?.setValue(selectProduct?.[0]?.SGST);
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGST")?.setValue(selectProduct?.[0]?.IGST);
    this.calculatePurchaseProductTotal();
  }

  calculatePurchaseProductTotal() {
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Quantity")?.setValue(this.serialNoList?.length);
    this.calculateGST();
    this.calculateDiscount();
    let purchaseAmount = this.PurchaseInfoForm.get("purchaseProductInfo")?.value?.PurchasePrice ?? 0;
    this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalAmount")?.setValue(Number((this.serialNoList?.length * purchaseAmount).toFixed(2)));
  }

  onWithOrWithoutGSTChange() {
    this.calculateGST();
    this.calculateDiscount();
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
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("PurchasePrice")?.setValue(Price);
    }
    else {
      if (ApplicableGSTType === APPLICABLE_GST_TYPE.C) {
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGST")?.setValue(0);
        this.PurchaseInfoForm.get("purchaseProductInfo")?.get("IGSTAmount")?.setValue(0);
        CGSTAmount = Number((((Price ?? 0) - ((Price ?? 0) * (100 / (100 + ((CGST * 2) ?? 0))))) / 2).toFixed(2));
        SGSTAmount = CGSTAmount;
        PurchasePrice = Number(((Price ?? 0) - (CGSTAmount ?? 0) - (SGSTAmount ?? 0)).toFixed(2));
        TotalCGSTAmount = Number((((CGSTAmount ?? 0)) * Quantity).toFixed(2));
        TotalSGSTAmount = Number((((SGSTAmount ?? 0)) * Quantity).toFixed(2));
        TotalGSTAmount = Number((((CGSTAmount ?? 0) + (SGSTAmount ?? 0)) * Quantity).toFixed(2));
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
        IGSTAmount = Number(((Price ?? 0) - ((Price ?? 0) * (100 / (100 + (IGST ?? 0))))).toFixed(2));
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
  onIsTCSApplicable() {
    if (this.PurchaseInfoForm.get("IsTCSApplicable")?.value == "1") {
      this.PurchaseInfoForm.get("TCS")?.setValidators([Validators.required]);//setting validation
      this.PurchaseInfoForm.get("TCS")?.setErrors({ 'required': true });//error message
      this.calculateTCS();
    }
    else {
      this.PurchaseInfoForm.get("TCS")?.clearValidators();//clear validation
      this.PurchaseInfoForm.get("TCS")?.setErrors(null);//updating error message
      this.PurchaseInfoForm.get("TCS")?.setValue(this.defaultTCS);
      this.PurchaseInfoForm.get("TCSAmount")?.setValue(0);
    }
    this.PurchaseInfoForm.updateValueAndValidity();//update validation
  }

  calculateTCS() {
    let TotalAmount = this.PurchaseInfoForm.get("TotalAmount")?.value ?? 0;
    let TotalTaxableAmount = this.PurchaseInfoForm.get("TotalTaxableAmount")?.value ?? 0;
    let TCS = this.PurchaseInfoForm.get("TCS")?.value ?? 0;
    let TCSAmount = (Number(((TotalAmount + TotalTaxableAmount) * TCS) / 100).toFixed(2));
    this.PurchaseInfoForm.get("TCSAmount")?.setValue(TCSAmount ?? 0);
  }

  calculateDiscount() {
    let PurchasePrice = this.PurchaseInfoForm?.get("purchaseProductInfo")?.get("PurchasePrice")?.value ?? 0;
    let Discount = this.PurchaseInfoForm?.get("purchaseProductInfo")?.get("Discount")?.value ?? 0;
    let Quantity = this.PurchaseInfoForm.get("purchaseProductInfo")?.get("Quantity")?.value ?? 0;
    let DiscountAmount = 0;
    let TotalDiscountAmount = 0;

    if (Discount > 0 && PurchasePrice > 0) {
      DiscountAmount = Number(((PurchasePrice * Discount) / 100).toFixed(2));
      TotalDiscountAmount = Number((DiscountAmount * Quantity).toFixed(2));
      this.PurchaseInfoForm?.get("purchaseProductInfo")?.get("DiscountAmount")?.setValue(DiscountAmount);
      this.PurchaseInfoForm.get("purchaseProductInfo")?.get("TotalDiscountAmount")?.setValue(TotalDiscountAmount);
      this.PurchaseInfoForm?.get("purchaseProductInfo")?.get("PurchasePrice")?.setValue(PurchasePrice - DiscountAmount);
    }
  }
  removeSrno(Srno) {
    this.serialNoList = this.serialNoList.filter(srno => srno != Srno);
    this.calculatePurchaseProductTotal();
  }
}
