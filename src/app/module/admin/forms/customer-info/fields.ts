import { Validators } from "@angular/forms";
import { Constant, controlType, directiveList } from "src/app/config/constants";
export const fields = [
    {
        fieldName: "CustomerID",
        validation: null,
        defaultValue: "",
        placeholder: "CustomerID",
        label: "CustomerID",
        isVisible: false,
        bootstrapFormGroup: "col-md-12",
        controlType: null
    },
    {
        fieldName: "BranchID",
        validation: null,
        defaultValue: "",
        placeholder: "BranchID",
        label: "BranchID",
        isVisible: false,
        bootstrapFormGroup: "col-md-12",
        controlType: null
    }, {
        fieldName: "CustomerTypeID",
        validation: [Validators.required],
        defaultValue: "C",
        placeholder: "CustomerTypeID",
        label: "CustomerTypeID",
        isVisible: true,
        bootstrapFormGroup: "col-md-12 col-12 col-xs-12 col-sm-12",
        controlType: controlType.Radio,
        radioGroup: Constant.CUSTOMER_TYPE,
        directiveName: directiveList.AlphaNumeric
    },
    {
        fieldName: "CustomerName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Customer Name",
        label: "Customer Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6 col-6 col-xs-6 col-sm-6",
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
        bootstrapFormGroup: "col-md-6 col-6 col-xs-6 col-sm-6",
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
        bootstrapFormGroup: "col-md-12 col-12 col-xs-12 col-sm-12",
        controlType: controlType.Textbox
    },
    {
        fieldName: "VehiclelNo",
        validation: null,
        defaultValue: "",
        placeholder: "Vehiclel No",
        label: "Vehiclel No",
        isVisible: true,
        bootstrapFormGroup: "col-md-6 col-6 col-xs-6 col-sm-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "VehicleName",
        validation: null,
        defaultValue: "",
        placeholder: "Vehicle Name",
        label: "Vehicle Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-6 col-6 col-xs-6 col-sm-6",
        controlType: controlType.Textbox
    },
    {
        fieldName: "GSTNo",
        validation: null,
        defaultValue: "",
        placeholder: "GST No",
        label: "GST No",
        isVisible: true,
        bootstrapFormGroup: "col-md-12 col-4 col-xs-4 col-sm-4",
        controlType: controlType.Textbox
    }
]