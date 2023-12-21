export class AdvanceSerachPurchaseInfo {
    public PartyID = "";
    public PurchaseID = "";
    public PurchaseDate = "";
    public BillNo = "";
    public TotalQuantity = "";
    public TotalAmount = "";
    public TotalPaidAmount = "";
    public PartyName = "";
    public ContactNo = "";
    public PartyInfo: PartyInfo;
    public PurchaseProductInfo = Array<PurchaseProductInfo>();

    constructor(purchase: any = {}) {
        this.PurchaseID = purchase?.purchaseID || "";
        this.PurchaseDate = purchase?.purchaseDate || "";
        this.BillNo = purchase?.billNo || "";
        this.TotalQuantity = purchase?.totalQuantity || "";
        this.TotalAmount = purchase?.totalAmount || "";
        this.TotalPaidAmount = purchase?.totalPaidAmount || "";
        this.PartyName = purchase?.partyName || "";
        this.ContactNo = purchase?.contactNo || "";
        this.PartyInfo = purchase?.partyInfo || "";

        if (purchase && purchase?.purchaseProductInfo && purchase?.purchaseProductInfo?.length) {
            purchase?.purchaseProductInfo?.forEach((party: any) => {
                this.PurchaseProductInfo.push(new PurchaseProductInfo(party));
            });
        }
        if (purchase && purchase?.partyInfo) {
            this.PartyInfo = new PartyInfo(purchase?.partyInfo);
        }
    }
}

export class PartyInfo {
    public PartyID = "";
    public PartyName = "";
    public ContactNo = "";
    public CreateDate = "";
    public UpdateDate = "";
    constructor(party: any = {}) {
        this.PartyID = party.partyID || "";
        this.PartyName = party.partyName || "";
        this.ContactNo = party.contactNo || "";
        this.CreateDate = party.createDate || "";
        this.UpdateDate = party.UpdateDate || "";
    }
}

export class PurchaseProductInfo {
    public PurchaseProductID = "";
    public PurchaseID = "";
    public ProductID = "";
    public SerialNo = "";
    public Price = "";
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
    constructor(purchaseProduct: any = {}) {
        this.PurchaseProductID = purchaseProduct?.purchaseProductID || "";
        this.PurchaseID = purchaseProduct?.purchaseID || "";
        this.ProductID = purchaseProduct?.productID || "";
        this.SerialNo = purchaseProduct?.serialNo || "";
        this.Price = purchaseProduct?.price || "";
        this.CategoryID = purchaseProduct?.categoryID || "";
        this.ProductName = purchaseProduct?.productName || "";
        this.Amp = purchaseProduct?.amp || "";
        this.BTBPrice = purchaseProduct?.bTBPrice || "";
        this.BTCPrice = purchaseProduct?.bTCPrice || "";
        this.BTMPrice = purchaseProduct?.bTMPrice || "";
        this.OldBatteryPrice = purchaseProduct?.oldBatteryPrice || "";
        this.WarrantyPeriod = purchaseProduct?.warrantyPeriod || "";
        this.GuaranteePeriod = purchaseProduct?.guaranteePeriod || "";
        this.SchemePoint = purchaseProduct?.schemePoint || "";
        this.CategoryName = purchaseProduct?.categoryName || "";
    }
}
