import { Validators } from "@angular/forms";
import { AppUrl } from "src/app/config/api";
import { controlType, directiveList } from "src/app/config/constants";

export const reportList = [
    {
        reportName: "Sale report by category wise",
        value: "Rpt_SaleReport_CategoryWise"
    },
    {
        reportName: "Sale report by bill no wise",
        value: "Rpt_SaleReport_BillWise"
    }
]