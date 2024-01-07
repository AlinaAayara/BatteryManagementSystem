export function generatePostRequestBody(data: any, mode: string) {

    let body: any = {};
    body.WarrantyID = data?.WarrantyID;
    body.ReplacementDate = data?.ReplacementDate;
    body.FinalPrice = data?.FinalPrice;

    body.WarrantyProductList = Array();
    body.Mode = mode;
    body.MethodName = "InUp_WarrantyInfo";
    data?.WarrantyProductList?.forEach(product => {
        let obj = {
            WarrantyProductID: "",
            WarrantyID: "",
            WarrantyType: product?.WarrantyType,
            CustomerID: product?.CustomerID,
            SaleID: product?.SaleID,
            ProductID: product?.ProductID,
            GuaranteePeriod: product?.GuaranteePeriod,
            GuaranteeEndDate: product?.GuaranteeEndDate,
            WarrantyPeriod: product?.WarrantyPeriod,
            WarrantyEndDate: product?.WarrantyEndDate,
            OldSerialNo: product?.OldSerialNo,
            NewSerialNo: product?.NewSerialNo,
            DiscountPercentage: product?.DiscountPercentage,
            DiscountAmount: product?.DiscountAmount,
            SalePrice: product?.SalePrice,
            FinalPrice: product?.FinalPrice,
            Mode: "0",
            MethodName: "InUp_WarrantyProductInfo"
        }
        body.WarrantyProductList.push(obj);
    });
    return body;
}