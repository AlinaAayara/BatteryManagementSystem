import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { BASICGROUP, controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "UserID",
        validation: null,
        defaultValue: "",
        placeholder: "UserID",
        label: "UserID",
        isVisible: false,
        bootstrapFormGroup: "col-md-6",
        directiveName: null
    },
    {
        fieldName: "GroupID",
        validation: [Validators.required],
        defaultValue: BASICGROUP.Dealer,
        placeholder: "GroupID",
        label: "GroupID",
        isVisible: false,
        bootstrapFormGroup: "col-md-6",
        directiveName: null
    },
    {
        fieldName: "Name",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Name",
        label: "Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        directiveName: directiveList.AlphaOnlyspace
    },
    {
        fieldName: "ContactNo",
        validation: null,
        defaultValue: "",
        placeholder: "Contact No",
        label: "ContactNo",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "Password",
        validation: [Validators.required],
        defaultValue: "123",
        placeholder: "Password",
        label: "Password",
        isVisible: false,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "UserFirmName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Firm Name",
        label: "Firm Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: null
    },
    {
        fieldName: "UserFirmAddress",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Firm Address",
        label: "Firm Address",
        isVisible: true,
        bootstrapFormGroup: "col-md-12",
        controlType: controlType.Textbox,
        directiveName: null
    },
    {
        fieldName: "GSTNo",
        validation: null,
        defaultValue: "",
        placeholder: "GST No",
        label: "GST No",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: null
    },
    {
        fieldName: "SateCode",
        validation: [Validators.required],
        defaultValue: "27",
        placeholder: "GST Sate Code",
        label: "GST Sate Code",
        isVisible: true,
        bootstrapFormGroup: "col-md-6",
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    }
]