import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "AmpID",
        validation: null,
        defaultValue: "",
        placeholder: "AmpID",
        label: "AmpID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null
    },
    {
        fieldName: "Amp",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Amp",
        label: "Amp",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    },
    {
        fieldName: "AmpWeight",
        validation: null,
        defaultValue: "",
        placeholder: "Weight",
        label: "Weight",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox,
        directiveName: directiveList.appDecimaNumber
    }
]