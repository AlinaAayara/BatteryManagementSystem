import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { AdvanceSerachSaleInfo } from "src/app/core/models/advance-search-sale-info";
import { AdvanceSearchWarrantyInfo } from "src/app/core/models/advance-search-warranty-info";

@Component({
  selector: 'app-warranty-search',
  templateUrl: './warranty-search.component.html',
  styleUrls: ['./warranty-search.component.css']
})
export class WarrantySearchComponent implements OnInit, OnChanges {
  @Output() closeSlideIn = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  constructor(private _sharedDataService: SharedDataService) {

  }
  ngOnInit(): void {

  }
  @Input() ActiveWarrantyInfoList: AdvanceSearchWarrantyInfo[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["ActiveWarrantyInfoList"]) {
      this.ActiveWarrantyInfoList = changes["ActiveWarrantyInfoList"]?.currentValue;
    }
  }
  delete(saleID) {
    this.deleteItem.emit(saleID);
    this.closeSlideIn.emit(false);
  }

  edit(item) {
    this._sharedDataService.warrantyInfoEdit.next(item);
    this.closeSlideIn.emit(false);
  }
}
