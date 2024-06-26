export class AppUrl {
    public static URL = {};

    // public static baseURL = "http://localhost:5213/api/";
    public static baseURL = "http://gbhwebapi.betech.in/api/";
    // public static reportBaseURL = "http://localhost:55335/ReportViewer.aspx"
    public static reportBaseURL = "http://bmsreportapp.betech.in/reportviewer.aspx"

    public static firmInfoURL = "FirmInfo/";
    public static basicUserURL = "BasicUser/";
    public static basicCategoryURL = "BasicCategory/";
    public static commonURL = "Common/";
    public static productInfoURL = "ProductInfo/";
    public static partyInfoURL = "PartyInfo/";
    public static basicBranchURL = "BasicBranch/";
    public static purchaseInfoURL = "PurchaseInfo/";
    public static customerInfoURL ="CustomerInfo/";
    public static saleInfoURL = "SaleInfo/";
    public static warrantyInfoURL = "WarrantyInfo/";
    public static oldBatteryInfoURL = "OldBatteryInfo/";
    public static basicGroupURL = "BasicGroup/";
    public static basicAmpURL = "BasicAmp/";
    public static basicPaymentModeURL = "BasicPaymentMode/";
    public static saleReturnInfoURL = "SaleReturnInfo/";
    public static basicGSTURL = "BasicGST/";
    public static partyTransactionInfoURL = "PartyTransactionInfo/";
    public static customerTransactionInfoURL = "CustomerTransactionInfo/";
    public static expenseInfoURL = "ExpenseInfo/";
    public static purchaseInwardURL = "PurchaseInward/";
    public static basicBankURL = "BasicBank/";
    public static bankTransactionInfoURL = "BankTransactionInfo/";
    public static purchaseReturnInfoURL = "PurchaseReturnInfo/";
    public static chartURL = "Chart/";
    //public static reportViewerURL = "ReportViewer/ViewReport"

    public static API = {
        Login: AppUrl.baseURL + AppUrl.basicUserURL + "authentication",
        add_basicuser: AppUrl.baseURL + AppUrl.basicUserURL + "AddUser",
        get_basicuser: AppUrl.baseURL + AppUrl.basicUserURL + "GetUser",
        change_password: AppUrl.baseURL + AppUrl.basicUserURL + "ChangePassword",
        

        get_current_user: AppUrl.baseURL + AppUrl.basicUserURL + "GetCurrentUser",
        AddGroup: AppUrl.baseURL + "BasicGroupAndFeature/AddGroup",
        add_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "AddFirm",
        get_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "GetFirm",

        add_basic_category: AppUrl.baseURL + AppUrl.basicCategoryURL + "AddCategory",
        get_basic_category: AppUrl.baseURL + AppUrl.basicCategoryURL + "GetCategory",

        delete_record: AppUrl.baseURL + AppUrl.commonURL + "DeleteRecord",
        get_serialNoHistory: AppUrl.baseURL + AppUrl.commonURL + "GetSerialNoHistory",

        add_product_info: AppUrl.baseURL + AppUrl.productInfoURL + "AddProduct",
        get_product_info: AppUrl.baseURL + AppUrl.productInfoURL + "GetProduct",

        add_party_info: AppUrl.baseURL + AppUrl.partyInfoURL + "AddParty",
        get_party_info: AppUrl.baseURL + AppUrl.partyInfoURL + "GetParty",

        add_basic_branch: AppUrl.baseURL + AppUrl.basicBranchURL + "AddBranch",
        get_basic_branch: AppUrl.baseURL + AppUrl.basicBranchURL + "GetBranch",

        add_purchaseInfo: AppUrl.baseURL + AppUrl.purchaseInfoURL + "AddPurchase",
        get_purchaseInfo: AppUrl.baseURL + AppUrl.purchaseInfoURL + "GetPurchase",
        get_purchaseInfoByID: AppUrl.baseURL + AppUrl.purchaseInfoURL + "GetPurchaseByID",
        getSerialNoForPurchase_purchaseInfo: AppUrl.baseURL + AppUrl.purchaseInfoURL + "GetSerialNoForPurchase",
        get_Next_PurchaseBillNo : AppUrl.baseURL + AppUrl.purchaseInfoURL + "GetPurchaseBillNo",

        add_customerInfo: AppUrl.baseURL + AppUrl.customerInfoURL + "AddCustomer",
        get_customerInfo: AppUrl.baseURL + AppUrl.customerInfoURL + "GetCustomer",

        add_saleInfo: AppUrl.baseURL + AppUrl.saleInfoURL + "AddSale",
        get_saleInfo: AppUrl.baseURL + AppUrl.saleInfoURL + "GetSale",
        get_saleInfoByID: AppUrl.baseURL + AppUrl.saleInfoURL + "GetSaleByID",
        
        get_PurchaseProductInfo_BySerialNo : AppUrl.baseURL + AppUrl.saleInfoURL + "GetPurchaseProductInfoBySerialNo",
        get_Next_BillNo : AppUrl.baseURL + AppUrl.saleInfoURL + "GetSaleBillNo",
        get_Old_Manufacturing_Serial_No : AppUrl.baseURL + AppUrl.saleInfoURL + "GetOldManufacturingSerialNo",

        add_warrantyInfo: AppUrl.baseURL + AppUrl.warrantyInfoURL + "AddWarranty",
        get_warrantyInfo: AppUrl.baseURL + AppUrl.warrantyInfoURL + "GetWarranty",
        return_warrantyInfo: AppUrl.baseURL + AppUrl.warrantyInfoURL + "GetWarrantyForCompanyReturn",
        returnWarrantyForCompanyReturn: AppUrl.baseURL + AppUrl.warrantyInfoURL + "ReturnWarrantyForCompanyReturn",
        
        getOldSerailNo_warrantyInfo: AppUrl.baseURL + AppUrl.warrantyInfoURL + "GetSerialNo_ForWarranty",

        add_oldBatteryInfo: AppUrl.baseURL + AppUrl.oldBatteryInfoURL + "AddOldBattery",
        get_oldBatteryInfo: AppUrl.baseURL + AppUrl.oldBatteryInfoURL + "GetOldBattery",

        add_basicGroup: AppUrl.baseURL + AppUrl.basicGroupURL + "AddGroup",
        get_basicGroup: AppUrl.baseURL + AppUrl.basicGroupURL + "GetGroup",

        add_basic_amp: AppUrl.baseURL + AppUrl.basicAmpURL + "AddAmp",
        get_basic_amp: AppUrl.baseURL + AppUrl.basicAmpURL + "GetAmp",

        add_basicPaymentMode: AppUrl.baseURL + AppUrl.basicPaymentModeURL + "AddPaymentMode",
        get_basicPaymentMode: AppUrl.baseURL + AppUrl.basicPaymentModeURL + "GetPaymentMode",

        add_saleReturnInfo: AppUrl.baseURL + AppUrl.saleReturnInfoURL + "AddSaleReturn",
        get_saleReturnInfo: AppUrl.baseURL + AppUrl.saleReturnInfoURL + "GetSaleReturn",

        add_basicGST: AppUrl.baseURL + AppUrl.basicGSTURL + "AddGST",
        get_basicGST: AppUrl.baseURL + AppUrl.basicGSTURL + "GetGST",

        add_partyTransactionInfo: AppUrl.baseURL + AppUrl.partyTransactionInfoURL + "AddPartyTransaction",
        get_partyTransactionInfo: AppUrl.baseURL + AppUrl.partyTransactionInfoURL + "GetPartyTransaction",

        add_customerTransactionInfo: AppUrl.baseURL + AppUrl.customerTransactionInfoURL + "AddCustomerTransaction",
        get_customerTransactionInfo: AppUrl.baseURL + AppUrl.customerTransactionInfoURL + "GetCustomerTransaction",

        add_expenseInfo: AppUrl.baseURL + AppUrl.expenseInfoURL + "AddExpense",
        get_expenseInfo: AppUrl.baseURL + AppUrl.expenseInfoURL + "GetExpense",

        add_purchaseinward: AppUrl.baseURL + AppUrl.purchaseInwardURL + "AddPurchaseInward",
        get_purchaseinward: AppUrl.baseURL + AppUrl.purchaseInwardURL + "GetPurchaseInward",

        add_basicbank: AppUrl.baseURL + AppUrl.basicBankURL + "AddBank",
        get_basicbank: AppUrl.baseURL + AppUrl.basicBankURL + "GetBank",

        add_bankTransactionInfo: AppUrl.baseURL + AppUrl.bankTransactionInfoURL + "AddBankTransaction",
        get_bankTransactionInfo: AppUrl.baseURL + AppUrl.bankTransactionInfoURL + "GetBankTransaction",

        add_purchaseReturnInfo: AppUrl.baseURL + AppUrl.purchaseReturnInfoURL + "AddPurchaseReturnInfo",
        update_PurchaseReturnInfo: AppUrl.baseURL + AppUrl.purchaseReturnInfoURL + "UpdatePurchaseReturnInfo",
        get_purchaseReturnInfo: AppUrl.baseURL + AppUrl.purchaseReturnInfoURL + "GetPurchaseReturnInfo",
        get_purchaseRReturnSerialNo: AppUrl.baseURL + AppUrl.purchaseReturnInfoURL + "GetPurchaseReturnSerialNo",
        sel_purchaseReturn: AppUrl.baseURL + AppUrl.purchaseReturnInfoURL + "SelPurchaseReturn",

        get_salechart: AppUrl.baseURL + AppUrl.chartURL + "GetSaleChart",
        get_purchasechart: AppUrl.baseURL + AppUrl.chartURL + "GetPurchaseChart",
        get_customerbalancechart: AppUrl.baseURL + AppUrl.chartURL + "GetCustomerBalanceChart",
        get_DSDLPartyBalancechart: AppUrl.baseURL + AppUrl.chartURL + "GetDSDLPartyBalanceChart",

        reportViewer : AppUrl.reportBaseURL
        

    };
}
