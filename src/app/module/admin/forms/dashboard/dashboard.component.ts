import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userType: string;
  constructor(
    private _sharedDataService: SharedDataService
  ) {
  }
  ngOnInit(): void {
    this.userType = this._sharedDataService?.currentUser?.userType;
  }
}
