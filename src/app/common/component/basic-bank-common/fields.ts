import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { Constant, controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "BankID",
        validation: null,
        defaultValue: "",
        placeholder: "BankID",
        label: "BankID",
        isVisible: false,
        bootstrapFormGroup: "col-md-12",
        controlType: null
    },
    {
        fieldName: "BankName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Bank Name",
        label: "Bank Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "AccountNo",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Account No",
        label: "Account No",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "AccountName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Account Name",
        label: "Account Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "IFSCCode",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "IFSC Code",
        label: "IFSC Code",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "Branch",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Branch",
        label: "Branch",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "IsMainBank",
        validation: [Validators.required],
        defaultValue: 0,
        placeholder: "IsMainBank",
        label: "IsMainBank",
        isVisible: true,
        bootstrapFormGroup: "col-md-12",
        controlType: controlType.Radio,
        radioGroup: Constant.YES_OR_NO_BANK,
        directiveName: directiveList.AlphaNumeric
    }
]