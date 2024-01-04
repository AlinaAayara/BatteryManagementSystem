import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";
export function generatePostRequestBody(data: any, mode :string) {
    let body: any = {};
    body.SaleReturnID = data?.SaleReturnID;
    body.SaleReturnDate = data?.SaleReturnDate;
    body.ReturnRemark = data?.ReturnRemark;

    body.SaleReturnProductList = Array();
    body.Mode = mode;
    body.MethodName = "InUp_SaleReturnInfo";
    data?.SaleReturnProductList?.forEach(product => {
            let obj = {
                SaleReturnID: "",
                SaleID: product?.SaleID,
                SerialNo: product?.SerialNo,
                CustomerID:product?.CustomerID,
                Mode: "0",
                MethodName: "InUp_SaleReturnProductInfo"
            }
            body.SaleReturnProductList.push(obj);
    });
    return body;
}