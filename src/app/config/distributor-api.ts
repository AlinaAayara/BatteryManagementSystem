import { AppUrl } from "./api";

export class DistributorAppUrl {
    public static URL = {};
    public static distributorPriceInfoURL = "DistributorPriceInfo/";

    public static API = {
        add_distributorPriceInfo: AppUrl.baseURL + DistributorAppUrl.distributorPriceInfoURL + "AddDistributorPrice",
        get_distributorPriceInfo: AppUrl.baseURL + DistributorAppUrl.distributorPriceInfoURL + "GetDistributorPrice"
    };
}
