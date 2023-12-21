import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AdvanceSerachPurchaseInfo } from "src/app/core/models/advance-serach-purchase-info";

@Component({
  selector: "app-purchase-search",
  templateUrl: "./purchase-search.component.html",
  styleUrls: ["./purchase-search.component.css"]
})
export class PurchaseSearchComponent implements OnChanges {
  @Input() ActivePurchaseInfoList: AdvanceSerachPurchaseInfo[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["ActivePurchaseInfoList"]) {
      this.ActivePurchaseInfoList = changes["ActivePurchaseInfoList"]?.currentValue;
    }
  }
delete(e){
console.log("e",e.target.className =="demo-pli-trash fs-5")
  }
}
