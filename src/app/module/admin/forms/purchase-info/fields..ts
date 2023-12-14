import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const fields = [
    {
        fieldName: "PurchaseDate",
        validation: null,
        defaultValue: "",
        placeholder: "Purchase Date",
        label: "PurchaseDate",
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
        controlType: controlType.Textbox,
        directiveName: directiveList.AlphaOnly
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

export interface IPurchaseProductObject {
    PurchaseID: 0,
    ProductName: "",
    CategoryID: 0,
    CategoryName: "",
    ProductID: 0,
    SerialNo: "",
    Price: 0,
    Quantity: 0,
    Total: 0,
    SerialNoList:[]

}