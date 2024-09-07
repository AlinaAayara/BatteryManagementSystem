import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { Constant, controlType, directiveList } from "src/app/config/constants";
export const fields = [
    {
        fieldName: "TransactionType",
        validation: [Validators.required],
        defaultValue: "CR",
        placeholder: "TransactionType",
        label: "TransactionType",
        isVisible: true,
        bootstrapFormGroup: "col-md-12",
        controlType: controlType.Radio,
        radioGroup: Constant.CR_OR_DR,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "BankTransactionID",
        validation: null,
        defaultValue: "",
        placeholder: "BankTransactionID",
        label: "BankTransactionID",
        isVisible: false,
        bootstrapFormGroup: "col-md-4",
        controlType: controlType.Textbox
    },
    {
        fieldName: "BankID",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "BankID",
        label: "Bank",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Dropdown,
        listData: {
            fetchURL: AppUrl.API.get_basicbank,
            requestBody: {
                MethodName: "Search_BasicBank"
            },
            textField: "BankName",
            valueField: "BankID",
            defaultValue: "",
            defaultSelectedText: "Select Bank"
        },
        directiveName: null,
        onChange: true
    },
    {
        fieldName: "TransactionDate",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Date",
        label: "Date",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.DateOnly,
        isDateControl: true,
        onChange: true
    },
    {
        fieldName: "Amount",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Amount",
        label: "Amount",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "Balance",
        validation: null,
        defaultValue: { value: "0", disabled: true },
        placeholder: "Balance",
        label: "Balance",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "Remark",
        validation: null,
        defaultValue: "",
        placeholder: "Remark",
        label: "Remark",
        isVisible: true,
        bootstrapFormGroup: "col-md-12",
        controlType: controlType.Textbox
    }
]