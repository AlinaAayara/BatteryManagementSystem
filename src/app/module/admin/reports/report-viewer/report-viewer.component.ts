import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { AppUrl } from 'src/app/config/api';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit, OnChanges {
  public reportUrl: SafeResourceUrl;
  @Input() public queryString: string;

  constructor(
    private sanitizer: DomSanitizer,
    private _sharedDataService: SharedDataService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['queryString']) {
      this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${AppUrl.API.reportViewer}?FirmID=${this._sharedDataService.currentUser.firmID}&${changes['queryString']?.currentValue}`);
    }
  }
  ngOnInit(): void {
    //this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://localhost:7147/api/ReportViewer/ViewReport?MethodName=Rpt_PurchaseInfo&PurchaseID=13');
  }
}
