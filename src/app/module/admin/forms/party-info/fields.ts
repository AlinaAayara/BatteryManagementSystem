import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "PartyID",
        validation: null,
        defaultValue: "",
        placeholder: "PartyID",
        label: "PartyID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null
    },
    {
        fieldName: "PartyName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Party Name",
        label: "Party Name",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.AlphaOnly
    },
    {
        fieldName: "ContactNo",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Contact No",
        label: "Contact No",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "GSTNo",
        validation: null,
        defaultValue: "",
        placeholder: "GST No",
        label: "GST No",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox
    }
]