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
        product?.SerialNoList?.forEach(srno => {
            let obj = {
                ProductID: product?.ProductID,
                SerialNo: srno,
                SalePrice: product?.Price,
                CGST: parseFloat(product?.CGST),
                CGSTAmount: parseFloat(product?.CGSTAmount),
                SGST: parseFloat(product?.SGST),
                SGSTAmount: parseFloat(product?.SGSTAmount),
                IGST: parseFloat(product?.IGST),
                IGSTAmount: parseFloat(product?.IGSTAmount),
                Discount: parseFloat(product?.Discount) ?? 0,
                DiscountAmount: parseFloat(product?.DiscountAmount) ?? 0,
                SalePriceIncTax: parseFloat(product?.SalePrice) ?? 0
            }
            body.SaleProductList.push(obj);
        })
    });
    return body;
}