import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";
export function generatePostRequestBody(data: any) {
    let body: any = {};
    body.SaleID = data?.SaleID;
    body.CustomerID = data?.CustomerID;
    body.BillDate = data?.BillDate;
    body.BillNo = data?.BillNo;
    //body.TotalQuantity = data?.TotalQuantity;
    body.TotalAmount = data?.TotalAmount;
    body.OldBatteryCount = data?.OldBatteryCount;
    body.TotalOldBatteryAmount = data?.TotalOldBatteryAmount;
    body.FinalAmount = data?.FinalAmount;
    body.TotalPaidAmount = data?.TotalPaidAmount;
    body.IsSaleReturn = data?.IsSaleReturn;

    body.SaleProductList = Array();
    body.Mode = "0";
    body.MethodName = "InUp_SaleInfo";
    data?.SaleProductList?.forEach(product => {
            let obj = {
                SaleID: "",
                ProductID: product?.ProductID,
                SerialNo: product?.SerialNo,
                SalePrice:product?.SerialNo,
                Mode: "0",
                MethodName: "InUp_SaleProductInfo"
            }
            body.SaleProductList.push(obj);
    });
    return body;
}