import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "ManufacturerPriceID",
        validation: null,
        defaultValue: "",
        placeholder: "ManufacturerPriceID",
        label: "ManufacturerPriceID",
        isVisible: false,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox
    },
    {
        fieldName: "CategoryID",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "CategoryID",
        label: "Category",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
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
        directiveName: null,
        onChange: true
    },
    {
        fieldName: "ProductID",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "ProductID",
        label: "ProductID",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Dropdown,
        directiveName: null,
        listData: {
            fetchURL: null,
            requestBody: {
                MethodName: "Search_ProductInfo"
            },
            textField: "ProductName",
            valueField: "ProductID",
            defaultValue: "",
            defaultSelectedText: "Select Product"
        },
        onChange: true
    },
    {
        fieldName: "PurchasePrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Purchase Price",
        label: "Purchase Price",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "SalePrice",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Sale Price",
        label: "Sale Price",
        isVisible: true,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "SchemePoint",
        validation: null,
        defaultValue: "",
        placeholder: "Scheme Point",
        label: "Scheme Point",
        isVisible: false,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "CGST",
        validation: null,
        defaultValue: "",
        placeholder: "CGST %",
        label: "CGST %",
        isVisible: true,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "SGST",
        validation: null,
        defaultValue: "",
        placeholder: "SGST %",
        label: "SGST %",
        isVisible: true,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "IGST",
        validation: null,
        defaultValue: "",
        placeholder: "IGST %",
        label: "IGST %",
        isVisible: true,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    }

]