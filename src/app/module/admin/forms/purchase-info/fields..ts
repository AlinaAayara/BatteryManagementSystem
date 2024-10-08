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
        bootstrapFormGroup: "col-md-12",
        controlType: null
    },
    {
        fieldName: "BranchName",
        validation: [Validators.required],
        defaultValue: "",
        placeholder: "Branch Name",
        label: "Branch Name",
        isVisible: true,
        bootstrapFormGroup: "col-md-12",
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
        bootstrapFormGroup: "col-md-12",
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
    SerialNoList: []
}

export function generatePostRequestBody(data: any, mode: string) {
    console.log("data",data);
    let body: any = {};
    body.PurchaseID = data?.PurchaseID;
    body.PartyID = data?.PartyID;
    body.PurchaseDate = data?.PurchaseDate;
    body.BillNo = data?.BillNo;
    body.TotalQuantity = data?.TotalQuantity;
    body.TotalAmount = data?.TotalAmount;
    body.TotalPaidAmount = data?.TotalPaidAmount;
    body.PurchaseID = data?.PurchaseID;
    body.GSTMode = data?.GSTMode;
    body.CGSTAmount = data?.CGSTAmount;
    body.SGSTAmount = data?.SGSTAmount;
    body.IGSTAmount = data?.IGSTAmount;
    body.IsTCSApplicable = data?.IsTCSApplicable;
    body.TCS = data?.TCS;
    body.TCSAmount = data?.TCSAmount;
    body.ApplicableGSTType = data?.ApplicableGSTType;
    body.TotalDiscountAmount = data?.TotalDiscountAmount;

    body.PurchaseProductList = Array();
    body.Mode = mode;
    body.MethodName = "InUp_PurchaseInfo";

    data?.PurchaseProductList?.forEach(product => {
        product?.SerialNoList?.forEach(srno => {
            let obj = {
                ProductID: product?.ProductID,
                SerialNo: srno,
                Price: product?.PurchasePrice,
                CGST: product?.CGST,
                CGSTAmount: product?.CGSTAmount,
                SGST: product?.SGST,
                SGSTAmount: product?.SGSTAmount,
                IGST: product?.IGST,
                IGSTAmount: product?.IGSTAmount,
                Discount: product?.Discount,
                DiscountAmount: product?.DiscountAmount
            }
            body.PurchaseProductList.push(obj);
        })
    });

    return body;
}