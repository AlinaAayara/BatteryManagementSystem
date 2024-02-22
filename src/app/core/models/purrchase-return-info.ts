
export class PurchaseReturnInfo {
    public PurchaseReturnID = "";
    public UserID = "";
    public BillDate = "";
    public TotalAmount = "";
    public TotalPaidAmount = "";
    public CustomerName = "";
    public TotalDiscountAmount = "";
    public ContactNo = "";
    public Address = "";
    public VehicleName = "";
    public VehiclelNo = "";
    public CustomerTypeID = "";
    public CustomerType = "";
    public CreateDate = "";
    public CustomerInfo: CustomerInfo;
    public Checked: boolean;
    public PurchaseReturnProductInfo = Array<PurchaseReturnProductInfo>();
    constructor(sale: any = {}) {
        this.PurchaseReturnID = sale?.purchaseReturnID || "";
        this.UserID = sale?.userID || "";
        this.BillDate = sale?.billDate || "";
        this.TotalAmount = sale?.totalAmount || "";
        this.TotalPaidAmount = sale?.totalPaidAmount || "";
        this.CustomerName = sale?.customerName || "";
        this.TotalDiscountAmount = sale?.totalDiscountAmount || "";
        this.ContactNo = sale?.contactNo || "";
        this.Address = sale?.address || "";
        this.VehicleName = sale?.vehicleName || "";
        this.CustomerTypeID = sale?.customerTypeID || "";
        this.CustomerType = sale?.customerType || "";
        this.VehiclelNo = sale?.vehiclelNo || "";

        if (sale && sale?.purchaseReturnProductInfo && sale?.purchaseReturnProductInfo?.length) {
            sale?.purchaseReturnProductInfo?.forEach((party: any) => {
                this.PurchaseReturnProductInfo.push(new PurchaseReturnProductInfo(party));
            });
        }
        if (sale && sale?.customerInfo) {
            this.CustomerInfo = new CustomerInfo(sale?.customerInfo);
        }

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
    public GSTNo = "";
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
        this.GSTNo = party.gstNo || "";
    }
}

export class PurchaseReturnProductInfo {
    public PurchaseReturnID = "";
    public PurchaseReturnProductID = "";
    public ProductID = "";
    public SerialNo = "";
    public Price = "";
    public CategoryID = "";
    public ProductName = "";
    public AmpID = "";
    public CategoryName = "";
    public Amp = "";
    constructor(saleProduct: any = {}) {
        this.PurchaseReturnID = saleProduct?.purchaseReturnID || "";
        this.PurchaseReturnProductID = saleProduct?.purchaseReturnProductID || "";
        this.ProductID = saleProduct?.productID || "";
        this.SerialNo = saleProduct?.serialNo || "";
        this.Price = saleProduct?.price || "";
        this.CategoryID = saleProduct?.categoryID || "";
        this.ProductName = saleProduct?.productName || "";
        this.AmpID = saleProduct?.ampID || "";
        this.CategoryName = saleProduct?.categoryName || "";
        this.Amp = saleProduct?.amp || "";
    }
}
