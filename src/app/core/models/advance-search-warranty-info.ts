import { CustomerInfo, SaleProductInfo } from "./advance-search-sale-info";
import { PartyInfo } from "./advance-serach-purchase-info";

export class AdvanceSearchWarrantyInfo {
    public WarrantyID = "";
    public CustomerID = "";
    public DiscountAmount = "";
    public DiscountPercentage = "";
    public FinalPrice = "";
    public SalePrice = "";
    public SaleID = "";
    public IsReturnToCompany = "";
    public ReplacementDate = "";
    public ReturnToCompanyDate = "";
    public OldSerialNo = "";
    public NewSerialNo = "";
    public CustomerInfo: CustomerInfo;
    public SaleProductInfo = Array<SaleProductInfo>();
    public ProductInfo: ProductInfo;

    constructor(sale: any = {}) {
        this.WarrantyID = sale?.warrantyID || "";
        this.CustomerID = sale?.customerID || "";
        this.DiscountAmount = sale?.discountAmount || "";
        this.DiscountPercentage = sale?.discountPercentage || "";
        this.FinalPrice = sale?.finalPrice || "";
        this.SalePrice = sale?.salePrice || "";
        this.OldSerialNo = sale?.oldSerialNo || "";
        this.NewSerialNo = sale?.newSerialNo || "";
        this.SaleID = sale?.saleID || "";
        this.IsReturnToCompany = sale?.isReturnToCompany || "";
        this.ReplacementDate = sale?.replacementDate || "";
        this.ReturnToCompanyDate = sale?.returnToCompanyDate || "";

        if (sale && sale?.saleProductInfo && sale?.saleProductInfo?.length) {
            sale?.saleProductInfo?.forEach((party: any) => {
                this.SaleProductInfo.push(new SaleProductInfo(party));
            });
        }
        if (sale && sale?.customerInfo) {
            this.CustomerInfo = new CustomerInfo(sale?.customerInfo);
        }
        if (sale && sale?.productInfo) {
            this.ProductInfo = new ProductInfo(sale?.productInfo);
        }

    }
}
export class ProductInfo {
    public CategoryID = "";
    public CategoryName = "";
    public ProductName = "";
    public Amp = "";
    public BTBPrice = "";
    public BTCPrice = "";
    public BTMPrice = "";
    public OldBatteryPrice = "";
    public WarrantyPeriod = "";
    public GuaranteePeriod = "";
    public SchemePoint = "";
    public CreateDate = "";
    public UpdateDate = "";
    constructor(party: any = {}) {
        this.CategoryID = party.categoryID || "";
        this.CategoryName = party.categoryName || "";
        this.ProductName = party.productName || "";
        this.Amp = party.amp || "";
        this.BTBPrice = party.bTBPrice || "";
        this.BTCPrice = party.bTCPrice || "";
        this.BTMPrice = party.bTMPrice || "";
        this.OldBatteryPrice = party.oldBatteryPrice || "";
        this.WarrantyPeriod = party.warrantyPeriod || "";
        this.GuaranteePeriod = party.guaranteePeriod || "";
        this.SchemePoint = party.schemePoint || "";
        this.CreateDate = party.createDate || "";
        this.UpdateDate = party.updateDate || "";
    }
}