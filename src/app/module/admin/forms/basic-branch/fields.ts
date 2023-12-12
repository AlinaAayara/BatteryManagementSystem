import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "BranchID",
        validation: null,
        defaultValue: "",
        placeholder: "BranchID",
        label: "BranchID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null
    },
    {
        fieldName: "BranchName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Branch Name",
        label: "Branch Name",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox
    },
    {
        fieldName: "Address",
        validation: null,
        defaultValue: "",
        placeholder: "Address",
        label: "Address",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox
    }
]