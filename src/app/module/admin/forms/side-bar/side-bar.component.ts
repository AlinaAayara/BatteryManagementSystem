import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { CurrentUser, Menu } from 'src/app/core/models/current-user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnChanges {
  @Input() public currentUser: CurrentUser;
  constructor(
    private _sharedDataService: SharedDataService,
    public _router: Router
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['currentUser']) {
      this.currentUser = changes['currentUser']?.currentValue;
    }
  }
  ngOnInit(): void {
    this.currentUser = this?._sharedDataService?.currentUser;
  }
  logout(){
    this._sharedDataService.clearThingsOnLogout();
    this._router.navigate(["Login"]);
  }
}
