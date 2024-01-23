import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";
export function generatePostRequestBody(data: any, mode: string) {
    let body: any = {};
    body.SaleID = data?.SaleID;
    body.CustomerID = data?.CustomerID;
    body.BillDate = data?.BillDate;
    body.BillNo = data?.BillNo;
    //body.TotalQuantity = data?.TotalQuantity;
    body.TotalAmount = data?.TotalAmount;
    body.OldBatteryPurchasePrice = data?.OldBatteryPurchasePrice;
    body.OldBatteryCount = data?.OldBatteryCount;
    body.TotalOldBatteryAmount = data?.TotalOldBatteryAmount;
    body.FinalAmount = data?.FinalAmount;
    body.DiscountAmount = data?.DiscountAmount;
    body.TotalPaidAmount = data?.TotalPaidAmount;
    body.AmpID = data?.AmpID;
    body.PaymentModeID = data?.PaymentModeID;
    body.Remark = data?.Remark;
    body.GSTMode = data?.GSTMode;
    body.CGSTAmount = data?.CGSTAmount;
    // body.SGST = data?.SGST;
    body.SGSTAmount = data?.SGSTAmount;
    // body.IGST = data?.IGST;
    body.IGSTAmount = data?.IGSTAmount;
    body.ApplicableGSTType = data?.ApplicableGSTType;
    body.SaleProductList = Array();
    body.Mode = mode;
    body.MethodName = "InUp_SaleInfo";
    data?.SaleProductList?.forEach(product => {
        let obj = {
            SaleID: "",
            ProductID: product?.ProductID,
            SerialNo: product?.SerialNo,
            SalePrice: product?.SalePrice,
            Mode: "0",
            MethodName: "InUp_SaleProductInfo",
            CGST: product?.CGST,
            CGSTAmount: product?.CGSTAmount,
            SGST: product?.SGST,
            SGSTAmount: product?.SGSTAmount,
            IGST: product?.IGST,
            IGSTAmount: product?.IGSTAmount
        }
        body.SaleProductList.push(obj);
    });
    return body;
}