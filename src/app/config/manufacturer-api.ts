import { AppUrl } from "./api";

export class ManufacturerAppUrl {
    public static URL = {};
    public static manufacturerPriceInfoURL = "ManufacturerPriceInfo/";

    public static API = {
        add_manufacturerPriceInfo: AppUrl.baseURL + ManufacturerAppUrl.manufacturerPriceInfoURL + "AddManufacturerPrice",
        get_manufacturerPriceInfo: AppUrl.baseURL + ManufacturerAppUrl.manufacturerPriceInfoURL + "GetManufacturerPrice"
    };
}
