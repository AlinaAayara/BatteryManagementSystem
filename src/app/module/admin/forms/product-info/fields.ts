import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "CategoryID",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "CategoryID",
        label: "Category",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Dropdown,
        listData: {
            fetchURL: AppUrl.API.get_basic_category,
            requestBody: {
                MethodName: "Search_BasicCategory"
            },
            textField: "CategoryName",
            valueField: "CategoryID",
            defaultValue: "",
            defaultSelectedText: "Select Category"
        },
        directiveName: null
    },
    {
        fieldName: "AmpID",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Amp",
        label: "Amp",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Dropdown,
        listData: {
            fetchURL: AppUrl.API.get_basic_category,
            requestBody: {
                MethodName: "Search_BasicAmp"
            },
            textField: "Amp",
            valueField: "AmpID",
            defaultValue: "",
            defaultSelectedText: "Select Amp"
        },
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "ProductID",
        validation: null,
        defaultValue: "",
        placeholder: "ProductID",
        label: "ProductID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null,
        directiveName: null
    },
    {
        fieldName: "ProductName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Product Name",
        label: "Product Name",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.AlphaNumeric
    },
    {
        fieldName: "PurchasePrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Purchase Price",
        label: "Purchase Price",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "BTBPrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "B2B Price",
        label: "B2B Price",
        isVisible: true,
        bootstrapFormGroup: 3,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "BTCPrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "B2C Price",
        label: "B2C Price",
        isVisible: true,
        bootstrapFormGroup: 3,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "BTMPrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "B2M Price",
        label: "B2M Price",
        isVisible: true,
        bootstrapFormGroup: 3,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "OldBatteryPrice",
        validation: null,
        defaultValue: "",
        placeholder: "Price",
        label: "Old Battery",
        isVisible: true,
        bootstrapFormGroup: 3,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "WarrantyPeriod",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Warranty Period",
        label: "Warranty Period",
        isVisible: true,
        bootstrapFormGroup: 4,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "GuaranteePeriod",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Guarantee Period",
        label: "Guarantee Period",
        isVisible: true,
        bootstrapFormGroup: 4,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "SchemePoint",
        validation: null,
        defaultValue: "",
        placeholder: "Scheme Point",
        label: "Scheme Point",
        isVisible: true,
        bootstrapFormGroup: 4,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    }

]