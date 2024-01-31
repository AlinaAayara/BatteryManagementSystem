export enum DeviceTypes {
    "D" = "DESKTOP",
    "T" = "TABLET",
    "M" = "MOBILE",
    "" = "UNKNOWN",
    "DESKTOP" = "D",
    "TABLET" = "T",
    "MOBILE" = "M",
    "UNKNOWN" = "",
}
export const Constant = {
    ISWRITE: "isWrite",
    ISDELETE: "isDelete",
    DEFAULT_TCS: "0.100",
    CUSTOMER_TYPE: [
        {
            Value: "B",
            Text: "B2B"
        },
        {
            Value: "C",
            Text: "B2C"
        },
        {
            Value: "M",
            Text: "B2M"
        }
    ],
    SALE_OR_PURCHASE_TYPE: [
        {
            Value: "P",
            Text: "Purchase"
        },
        {
            Value: "S",
            Text: "Sale"
        }
    ],
    WITH_OR_WITHOUT_GST: [
        {
            Value: "W",
            Text: "WG"
        },
        {
            Value: "G",
            Text: "G"
        }
    ],
    CR_OR_DR: [
        {
            Value: "CR",
            Text: "Credit"
        },
        {
            Value: "DR",
            Text: "Debit"
        }
    ],
    /* dont change this yes or no used multiple places */
    YES_OR_NO: [
        {
            Value: "1",
            Text: "Yes"
        },
        {
            Value: "0",
            Text: "No"
        }
    ],
    CHOOSE_CUSTOMER: "Choose Customer",
    CHOOSE_PARTY: "Choose Party",
    CHOOSE_DISTRIBUTOR: "Choose Distributor",
    CHOOSE_DEALER: "Choose Dealer",
    CHOOSE_SOLD_PRODUCT: "Choose Sold Product",
    NOTIFICATION_TIME: 5000,
    NOTIFICATION_TIMEOUT: 2000,
    USER_TYPES_ARRAY: ["MF", "DS", "DL"],
    Months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    REGEX: {
        ALPHA: /[^a-zA-Z]/g,
        ALPHA_NUMERIC: /[^a-zA-Z0-9]/g,
        ALPHA_SPECIALCHAR: /[^a-zA-Z ]/g,
        NUMERIC: /[^0-9]/,
        DATE: /[^0-9/]/,
        TRIM_SPACE_HYPEN: /^(\s|-|\u2013|\u2014)+|(\s|-|\u2013|\u2014)+$/g,
        EMAIL_PATTERN: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
        ACCEPTED_AGENT_EMAIL_DOMAIN: /.+@(united|skywest|gojetairlines|tshstl|rjet|commutair|mesa-air|expressjet|capeair|airwis)\.com$/,
        NUMERIC_PATTERN: "\\d*",
        ALPHA_SPACE_DASH_SLASH: /[^a-zA-Z\s\-\//\\/]/g,
        ZERO_NUMRIC: /^[0]+$/,
        CREDIT_CATE_DATE: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        ALPHA_NUMERIC_PRE_AUTH_CODE: /[a-zA-Z0-9]/g,
        DECIMAL: /[^0-9.]/
    },

    ADVANCE_SEARCH_TAB:
        ["PurchaseInfo", "SaleInfo", "WarrantyInfo", "ManufacturerPurchaseInfo", "ManufacturerSaleInfo"]

}
export enum controlType {
    Textbox = "Textbox",
    Dropdown = "Dropdown",
    Radio = "Radio"
}

export enum directiveList {
    NumberOnly = "NumberOnly",
    AlphaNumeric = "AlphaNumeric",
    AlphaOnly = "AlphaOnly",
    AlphaOnlyspace = "AlphaOnlyspace",
    appAutofocus = "appAutofocus",
    appDecimaNumber = "appDecimaNumber",
    inputValidator = "inputValidator",
    appTrapFocus = "appTrapFocus",
    DateOnly = "DateOnly"
}

export enum CustomerTypeID_ToPurchaseProduct {
    B = "BTBPrice",
    C = "BTCPrice",
    M = "BTMPrice"
}

export enum APPLICABLE_GST_TYPE {
    C = "CSGT_SGST",
    I = "IGST"
}

export enum BASICGROUP {
    SuperAdmin = 1,
    Manufacturer = 2,
    Distributor = 3,
    Dealer = 4
}
export enum USER_TYPES {
    Manufacturer = "MF",
    Distributor = "DS",
    Dealer = "DL"
}