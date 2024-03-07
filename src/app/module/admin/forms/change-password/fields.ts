import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "Password",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Enter New Password",
        label: "Enter New Password",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Password,
        directiveName: directiveList.AlphaNumeric
    },
    {
        fieldName: "RePassword",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Re Enter New Password",
        label: "Re Enter New Password",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Password,
        directiveName: directiveList.AlphaNumeric
    }
]