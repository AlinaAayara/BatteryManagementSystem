import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartService } from 'src/app/Services/Chart/chart.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-dsdlparty-balance-chart',
  templateUrl: './dsdlparty-balance-chart.component.html',
  styleUrls: ['./dsdlparty-balance-chart.component.css']
})
export class DSDLPartyBalanceChartComponent implements OnInit {
  public userType: string;
  public chartList: any[] = [];
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];
  public todaysSale: string;

  constructor(
    private _sharedDataService: SharedDataService,
    private _ChartService: ChartService
  ) {
  }
  ngOnInit(): void {
    this.userType = this._sharedDataService?.currentUser?.userType;
    this.getSaleChart();
  }

  getSaleChart() {
    this._ChartService.GetDSDLPartyBalance(this.getSaleChartRequestBody()).subscribe({
      next: data => {
        this.chartList = data;
        if (this.chartList?.length > 0){
          this.todaysSale = this.chartList?.[0]?.TodaysAmount;
          this.createChart();
        }
          
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  getSaleChartRequestBody() {
    return {
      MethodName: "Sel_DSDLPartyBalanceChart"
    }
  }

  createChart() {
    this.chartList?.forEach(sale => {
      this.labeldata.push(sale?.Name);
      this.realdata.push(sale?.Balance);
      this.colordata.push('rgb(255, 255, 255)');
    });
    let lineChart: any = {
      type: 'bar',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: '# Balance',
          data: this.realdata,
          borderColor: "white",
          backgroundColor: "rgba(255,255,255)",
          fill: "start",
          borderWidth: 1,
          color: "white",

        }]
      },
      options: {
        scales: {
          y: {
            ticks: { color: 'rgba(255,255,255)', beginAtZero: true }
          },
          x: {
            ticks: { color: 'rgba(255,255,255)', beginAtZero: true }
          }
        }
      }
    };
    new Chart('dsdlPartyBalanceChart', lineChart);
  }
}
