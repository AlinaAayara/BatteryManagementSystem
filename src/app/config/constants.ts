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
    NOTIFICATION_TIME: 5000,
    NOTIFICATION_TIMEOUT: 2000,
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
    }
}
export enum controlType {
    Textbox = "Textbox",
    Dropdown ="Dropdown"
}
