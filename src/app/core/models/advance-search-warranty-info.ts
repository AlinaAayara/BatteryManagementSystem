import { CustomerInfo, SaleProductInfo } from "./advance-search-sale-info";
import { PartyInfo } from "./advance-serach-purchase-info";

export class AdvanceSearchWarrantyInfo {
    public WarrantyID = "";
    public DiscountAmount = "";
    public FinalPrice = "";
    public ReplacementDate = "";
    public WarrantyProductInfo = Array<WarrantyProductInfo>();

    constructor(sale: any = {}) {
        this.WarrantyID = sale?.warrantyID || "";
        this.DiscountAmount = sale?.discountAmount || "";
        this.FinalPrice = sale?.finalPrice || "";
        this.ReplacementDate = sale?.replacementDate || "";

        if (sale && sale?.warrantyProductInfo && sale?.warrantyProductInfo?.length) {
            sale?.warrantyProductInfo?.forEach((party: any) => {
                this.WarrantyProductInfo.push(new WarrantyProductInfo(party));
            });
        }
    }
}
export class WarrantyProductInfo {
    public WarrantyID = "";
    public WarrantyProductID = "";
    public DiscountAmount = "";
    public DiscountPercentage = "";
    public FinalPrice = "";
    public GuaranteeEndDate = "";
    public GuaranteePeriod = "";
    public IsReturnToCompany = "";
    public OldSerialNo = "";
    public NewSerialNo = "";
    public ProductID = "";
    public WarrantyEndDate = "";
    public WarrantyPeriod = "";
    public WarrantyType = "";
    public ProductName = "";
    public CustomerID = "";
    public ContactNo = "";
    public CustomerName = "";
    public CustomerTypeID = "";
    public VehiclelNo = "";
    public VehicleName = "";
    public CustomerType = "";
    constructor(party: any = {}) {
        this.WarrantyID = party.warrantyID || "";
        this.WarrantyProductID = party.warrantyProductID || "";
        this.DiscountAmount = party.discountAmount || "";
        this.DiscountPercentage = party.discountPercentage || "";
        this.FinalPrice = party.finalPrice || "";
        this.GuaranteeEndDate = party.guaranteeEndDate || "";
        this.GuaranteePeriod = party.guaranteePeriod || "";
        this.IsReturnToCompany = party.isReturnToCompany || "";
        this.OldSerialNo = party.oldSerialNo || "";
        this.NewSerialNo = party.newSerialNo || "";
        this.ProductID = party.productID || "";
        this.WarrantyEndDate = party.warrantyEndDate || "";
        this.WarrantyPeriod = party.warrantyPeriod || "";
        this.WarrantyType = party.warrantyType || "";
        this.ProductName = party.productName || "";
        this.CustomerID = party.customerID || "";
        this.ContactNo = party.contactNo || "";
        this.CustomerName = party.customerName || "";
        this.CustomerTypeID = party.customerTypeID || "";
        this.VehiclelNo = party.vehiclelNo || "";
        this.VehicleName = party.vehicleName || "";
        this.CustomerType = party.customerType || "";
    }
}