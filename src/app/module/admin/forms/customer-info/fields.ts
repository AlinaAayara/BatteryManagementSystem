import { Validators } from "@angular/forms";
import { controlType, directiveList } from "src/app/config/constants";
export const fields = [
    {
        fieldName: "CustomerID",
        validation: null,
        defaultValue: "",
        placeholder: "CustomerID",
        label: "CustomerID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null
    },
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
        fieldName: "CustomerName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Customer Name",
        label: "Customer Name",
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
        fieldName: "Address",
        validation: null,
        defaultValue: "",
        placeholder: "Address",
        label: "Address",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Textbox
    },
    {
        fieldName: "VehiclelNo",
        validation: null,
        defaultValue: "",
        placeholder: "Vehiclel No",
        label: "Vehiclel No",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox
    },
    {
        fieldName: "VehicleName",
        validation: null,
        defaultValue: "",
        placeholder: "Vehicle Name",
        label: "Vehicle Name",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox
    }
]