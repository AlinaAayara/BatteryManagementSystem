import { AppUrl } from "./api";

export class DealerAppUrl {
    public static URL = {};
    public static dealerPriceInfoURL = "DealerPriceInfo/";

    public static API = {
        add_dealerPriceInfo: AppUrl.baseURL + DealerAppUrl.dealerPriceInfoURL + "AddDealerPrice",
        get_dealerPriceInfo: AppUrl.baseURL + DealerAppUrl.dealerPriceInfoURL + "GetDealerPrice"
    };
}
