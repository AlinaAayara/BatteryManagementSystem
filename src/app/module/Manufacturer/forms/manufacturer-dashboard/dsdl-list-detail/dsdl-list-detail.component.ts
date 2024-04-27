import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/Services/Chart/chart.service';

@Component({
  selector: 'app-dsdl-list-detail',
  templateUrl: './dsdl-list-detail.component.html',
  styleUrls: ['./dsdl-list-detail.component.css']
})
export class DsdlListDetailComponent implements OnInit {
  public dSDLListDeail: any;
  constructor(
    public _ChartService: ChartService
  ) {

  }
  ngOnInit(): void {
    this.getDSDLListDeailDashboard();
  }


  getDSDLListDeailDashboard() {
    this._ChartService.GetDSDLListDeailDashboard(this.getDSDLListDeailDashboardRequestBody()).subscribe({
      next: data => {
        this.dSDLListDeail = data?.DISTRIBUTOR;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }

  getDSDLListDeailDashboardRequestBody() {
    return {
      MethodName: "Sel_DSDLListDeail_Dashboard"
    }
  }
}
