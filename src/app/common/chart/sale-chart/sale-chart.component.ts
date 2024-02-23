import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { ChartService } from 'src/app/Services/Chart/chart.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-sale-chart',
  templateUrl: './sale-chart.component.html',
  styleUrls: ['./sale-chart.component.css']
})
export class SaleChartComponent implements OnInit {
  public userType: string;
  public chartList: any[] = [];
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];
  public todaysSale: string;

  constructor(
    private _sharedDataService: SharedDataService,
    private _ChartService: ChartService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.userType = this._sharedDataService?.currentUser?.userType;
    this.getSaleChart();
  }

  getSaleChart() {
    this._ChartService.GetSaleChart(this.getSaleChartRequestBody()).subscribe({
      next: data => {
        this.chartList = data;
        if (this.chartList?.length > 0) {
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
      MethodName: "Sel_SaleChart"
    }
  }

  createChart() {
    this.chartList?.forEach(sale => {
      this.labeldata.push(sale?.DayMonthsName);
      this.realdata.push(sale?.FinalAmount);
      this.colordata.push('rgb(255, 255, 255)');
    });
    let lineChart: any = {
      type: 'line',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: '# Sale',
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
    new Chart('saleChart', lineChart);
  }

  navigate() {
    let id = "";
    const subMenuURL = this.userType == 'MF' ? 'ManufacturerSaleInfo' : this.userType == 'DS' ? 'DistributorSaleInfo' : 'SaleInfo';
    this._sharedDataService.currentUser?.menu?.forEach((m) => {
      m?.subMenu?.forEach((sub) => {
        if (sub?.subMenuURL == subMenuURL) {
          id = sub?.subMenuID;
        }
      }
      )
    });
    this.router.navigate([`/Home/${subMenuURL}`], {
      queryParams: {
        id: id
      }
    });
  }
}
