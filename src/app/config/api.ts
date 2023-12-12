export class AppUrl {
    public static URL = {};
    public static baseURL = "https://localhost:7147/api/";
    //public static baseURL = "http://RanzunzarWebApi.betech.in/api/";
    public static firmInfoURL = "FirmInfo/";
    public static basicUserURL = "BasicUser/";
    public static basicCategoryURL = "BasicCategory/";
    public static commonURL = "Common/";
    public static productInfoURL = "ProductInfo/";
    public static partyInfoURL = "PartyInfo/";
    public static basicBranchURL = "BasicBranch/";

    public static API = {
        Login: AppUrl.baseURL + AppUrl.basicUserURL + "authentication",
        get_current_user: AppUrl.baseURL + AppUrl.basicUserURL + "GetCurrentUser",
        AddGroup: AppUrl.baseURL + "BasicGroupAndFeature/AddGroup",
        add_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "AddFirm",
        get_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "GetFirm",

        add_basic_category: AppUrl.baseURL + AppUrl.basicCategoryURL + "AddCategory",
        get_basic_category: AppUrl.baseURL + AppUrl.basicCategoryURL + "GetCategory",

        delete_record: AppUrl.baseURL + AppUrl.commonURL + "DeleteRecord",

        add_product_info: AppUrl.baseURL + AppUrl.productInfoURL + "AddProduct",
        get_product_info: AppUrl.baseURL + AppUrl.productInfoURL + "GetProduct",

        add_party_info: AppUrl.baseURL + AppUrl.partyInfoURL + "AddParty",
        get_party_info: AppUrl.baseURL + AppUrl.partyInfoURL + "GetParty",

        add_basic_branch: AppUrl.baseURL + AppUrl.basicBranchURL + "AddBranch",
        get_basic_branch: AppUrl.baseURL + AppUrl.basicBranchURL + "GetBranch",


    };
}
