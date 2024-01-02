import { Component, OnInit } from '@angular/core';
import { reportList } from './fields';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public reportList = reportList;
  public ReportID;

  constructor(
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
  }

  viewReport() {
    this._sharedDataService.openReportSlideIn.next("MethodName=" + this.ReportID + "&SaleID=&FromDate=&ToDate=&BillNo=&CustomerName=&ContactNo=&CustomerTypeID=&CategoryID=&ProductID=&SerialNo=&PartyID=&PurchaseBllNo=&AmpID");
  }
}
