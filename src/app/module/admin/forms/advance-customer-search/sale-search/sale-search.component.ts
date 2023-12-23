import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { AdvanceSerachSaleInfo } from "src/app/core/models/advance-search-sale-info";

@Component({
  selector: 'app-sale-search',
  templateUrl: './sale-search.component.html',
  styleUrls: ['./sale-search.component.css']
})
export class SaleSearchComponent implements OnInit, OnChanges {
  @Output() closeSlideIn = new EventEmitter();
  constructor(private _sharedDataService: SharedDataService) {

  }
  ngOnInit(): void {

  }
  @Input() ActiveSaleInfoList: AdvanceSerachSaleInfo[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["ActiveSaleInfoList"]) {
      this.ActiveSaleInfoList = changes["ActiveSaleInfoList"]?.currentValue;
    }
  }
  delete(saleID) {
  }

  edit(item) {
    this._sharedDataService.saleInfoEdit.next(item);
    this.closeSlideIn.emit(false);
  }
}
