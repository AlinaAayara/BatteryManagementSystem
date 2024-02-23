import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-serial-no-time-line',
  templateUrl: './serial-no-time-line.component.html',
  styleUrls: ['./serial-no-time-line.component.css']
})
export class SerialNoTimeLineComponent implements OnInit, OnChanges {
  @Input() public AdvanceSearchTextString;
  @Output() public closeSlideInPopup = new EventEmitter();
  public serialNoList: any[] = [];
  constructor(
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["AdvanceSearchTextString"]) {
      this.AdvanceSearchTextString = changes["AdvanceSearchTextString"]?.currentValue;
      setTimeout(() => {
        this.getSerialNoHistory();
      }, 1000);
    }
  }
  ngOnInit(): void {
  }
  getSerialNoHistory() {
    this._sharedDataService.getSerialNoHistory(this.getSerialNoHistoryRequestBody()).subscribe({
      next: data => {
        this.serialNoList = data;
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }
  getSerialNoHistoryRequestBody() {
    return {
      MethodName: "Sel_SerialNoHistory",
      SerialNo: this.AdvanceSearchTextString
    }
  }
  openInvoice(serialNoDetail) {
    if (serialNoDetail?.Source == 'PurchaseInfo') {
      this.openPurchaseInvoice(serialNoDetail?.PurchaseID);
    } else if (serialNoDetail?.Source == 'SaleInfo') {
      this.openSaleInvoice(serialNoDetail?.PurchaseID);
    } else if (serialNoDetail?.Source == 'WarrantyInfo') {
      this.openWarrantyInvoice(serialNoDetail?.PurchaseID);
    }
  }

  openPurchaseInvoice(PurchaseID) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_PurchaseInfo&PurchaseID=" + PurchaseID);
  }
  openSaleInvoice(SaleID) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_SaleInfo&SaleID=" + SaleID);
  }
  openWarrantyInvoice(WarrantyID) {
    this._sharedDataService.openReportSlideIn.next("MethodName=Rpt_WarrantyInfo&WarrantyID=" + WarrantyID);
  }
}
