
export class AdvanceSerachSaleInfo {
    public SaleID = "";
    public CustomerID = "";
    public BillDate = "";
    public BillNo = "";
    public TotalQuantity = "";
    public TotalAmount = "";
    public TotalPaidAmount = "";
    public CustomerName = "";
    public ContactNo = "";
    public Address = "";
    public VehicleName = "";
    public CustomerTypeID = "";
    public CustomerType = "";
    public VehiclelNo = "";
    public TotalOldBatteryAmount = "";
    public OldBatteryCount = "";
    public CustomerInfo: CustomerInfo;
    public PaymentModeID: "";
    public Remark: "";
    public AmpID: "";
    public SaleProductInfo = Array<SaleProductInfo>();
    public DiscountAmount: "";
    public OldBatteryPurchasePrice: "";
    public PurchaseID: "";
    public PurchaseBillNo: "";
    public SaleReturnID: "";
    public SaleReturnDate: "";
    public ReturnRemark: "";

    constructor(sale: any = {}) {
        this.SaleID = sale?.saleID || "";
        this.CustomerID = sale?.customerID || "";
        this.BillDate = sale?.billDate || "";
        this.BillNo = sale?.billNo || "";
        this.TotalOldBatteryAmount = sale?.totalOldBatteryAmount || "";
        this.OldBatteryCount = sale?.oldBatteryCount || "";
        this.TotalAmount = sale?.totalAmount || "";
        this.TotalPaidAmount = sale?.totalPaidAmount || "";
        this.CustomerName = sale?.customerName || "";
        this.ContactNo = sale?.contactNo || "";
        this.Address = sale?.address || "";
        this.VehicleName = sale?.vehicleName || "";
        this.CustomerTypeID = sale?.customerTypeID || "";
        this.CustomerType = sale?.customerType || "";
        this.PaymentModeID = sale?.paymentModeID || "";
        this.Remark = sale?.remark || "";
        this.AmpID = sale?.ampID || "";
        this.VehiclelNo = sale?.vehiclelNo || "";
        this.DiscountAmount = sale?.discountAmount || "";
        this.OldBatteryPurchasePrice = sale?.oldBatteryPurchasePrice || "";
        this.PurchaseID = sale?.purchaseID || "";
        this.PurchaseBillNo = sale?.purchaseBillNo || "";
        this.SaleReturnID = sale?.saleReturnID || "";
        this.SaleReturnDate = sale?.saleReturnDate || "";
        this.ReturnRemark = sale?.returnRemark || "";

        if (sale && sale?.saleProductInfo && sale?.saleProductInfo?.length) {
            sale?.saleProductInfo?.forEach((party: any) => {
                this.SaleProductInfo.push(new SaleProductInfo(party));
            });
        }
        if (sale && sale?.customerInfo) {
            this.CustomerInfo = new CustomerInfo(sale?.customerInfo);
        }

        this.TotalQuantity = this.SaleProductInfo.length + "" || "0";
    }
}
export class CustomerInfo {
    public CustomerID = "";
    public BranchID = "";
    public CustomerTypeID = "";
    public CustomerType = "";
    public CustomerName = "";
    public ContactNo = "";
    public Address = "";
    public VehiclelNo = "";
    public VehicleName = "";
    public CreateDate = "";
    constructor(party: any = {}) {
        this.CustomerID = party.customerID || "";
        this.BranchID = party.branchID || "";
        this.CustomerTypeID = party.customerTypeID || "";
        this.CustomerType = party.customerType || "";
        this.CustomerName = party.customerName || "";
        this.ContactNo = party.contactNo || "";
        this.Address = party.address || "";
        this.VehiclelNo = party.vehiclelNo || "";
        this.VehicleName = party.vehicleName || "";
        this.CreateDate = party.createDate || "";
    }
}

export class SaleProductInfo {
    public SaleProductID = "";
    public SaleID = "";
    public ProductID = "";
    public SerialNo = "";
    public SalePrice = "";
    public GuaranteeEndDate = "";
    public WarrantyEndDate = "";
    public CategoryID = "";
    public ProductName = "";
    public Amp = "";
    public BTBPrice = "";
    public BTCPrice = "";
    public BTMPrice = "";
    public OldBatteryPrice = "";
    public WarrantyPeriod = "";
    public GuaranteePeriod = "";
    public SchemePoint = "";
    public CategoryName = "";
    public AmpID = "";
    public PurchasePrice = "";
    public OldBatterySalePrice = "";

    constructor(saleProduct: any = {}) {
        this.SaleProductID = saleProduct?.saleProductID || "";
        this.SaleID = saleProduct?.saleID || "";
        this.ProductID = saleProduct?.productID || "";
        this.SerialNo = saleProduct?.serialNo || "";
        this.SalePrice = saleProduct?.salePrice || "";
        this.GuaranteeEndDate = saleProduct?.guaranteeEndDate || "";
        this.WarrantyEndDate = saleProduct?.warrantyEndDate || "";
        this.CategoryID = saleProduct?.categoryID || "";
        this.ProductName = saleProduct?.productName || "";
        this.Amp = saleProduct?.amp || "";
        this.BTBPrice = saleProduct?.bTBPrice || "";
        this.BTCPrice = saleProduct?.bTCPrice || "";
        this.OldBatteryPrice = saleProduct?.oldBatteryPrice || "";
        this.WarrantyPeriod = saleProduct?.warrantyPeriod || "";
        this.GuaranteePeriod = saleProduct?.guaranteePeriod || "";
        this.SchemePoint = saleProduct?.schemePoint || "";
        this.CategoryName = saleProduct?.categoryName || "";
        this.AmpID = saleProduct?.ampID || "";
        this.PurchasePrice = saleProduct?.purchasePrice || "";
        this.OldBatterySalePrice = saleProduct?.oldBatterySalePrice || "";
    }
}
