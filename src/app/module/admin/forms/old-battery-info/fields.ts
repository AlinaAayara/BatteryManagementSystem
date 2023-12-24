import { Validators } from "@angular/forms";
import { Constant, controlType, directiveList } from "src/app/config/constants";
export const fields = [
    {
        fieldName: "OldBatteryID",
        validation: null,
        defaultValue: "",
        placeholder: "OldBatteryID",
        label: "OldBatteryID",
        isVisible: false,
        bootstrapFormGroup: 12,
        controlType: null
    },
    {
        fieldName: "SaleOrPurchase",
        validation: [Validators.required],
        defaultValue: "P",
        placeholder: "SaleOrPurchase",
        label: "SaleOrPurchase",
        isVisible: true,
        bootstrapFormGroup: 12,
        controlType: controlType.Radio,
        radioGroup: Constant.SALE_OR_PURCHASE_TYPE,
        directiveName: directiveList.AlphaNumeric
    },
    {
        fieldName: "BillDate",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Bill Date",
        label: "Bill Date",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        isDateControl : true
    },
    {
        fieldName: "Amp",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Amp",
        label: "Amp",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "TotalQuantity",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Total Quantity",
        label: "Total Quantity",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.NumberOnly
    },
    {
        fieldName: "TotalAmount",
        validation: null,
        defaultValue: "",
        placeholder: "Total Amount",
        label: "Total Amount",
        isVisible: true,
        bootstrapFormGroup: 6,
        controlType: controlType.Textbox,
        directiveName: directiveList.AlphaNumeric
    }
]