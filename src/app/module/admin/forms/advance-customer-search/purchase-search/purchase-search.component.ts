import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { AdvanceSerachPurchaseInfo } from "src/app/core/models/advance-serach-purchase-info";

@Component({
  selector: "app-purchase-search",
  templateUrl: "./purchase-search.component.html",
  styleUrls: ["./purchase-search.component.css"]
})
export class PurchaseSearchComponent implements OnInit, OnChanges {
  @Output() closeSlideIn = new EventEmitter();
  public isPrint = false;
  constructor(private _sharedDataService: SharedDataService) {

  }
  ngOnInit(): void {

  }
  @Input() ActivePurchaseInfoList: AdvanceSerachPurchaseInfo[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["ActivePurchaseInfoList"]) {
      this.ActivePurchaseInfoList = changes["ActivePurchaseInfoList"]?.currentValue;
    }
  }
  delete(purchaseID) {
  }

  edit(item) {
    this._sharedDataService.purchaseInfoEdit.next(item);
    this.closeSlideIn.emit(false);
  }

  print(item) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_PurchaseInfo&PurchaseID="+item.PurchaseID);
  }
}