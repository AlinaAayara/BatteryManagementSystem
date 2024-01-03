import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['currentUser']) {
      this.currentUser = this._sharedDataService.getIsShowOnMenuBar(changes['currentUser']?.currentValue, "1");
    }
  }
  ngOnInit(): void {
    this.currentUser = this._sharedDataService.getIsShowOnMenuBar(this?._sharedDataService?.currentUser, "1");
  }

  logout() {
    this._sharedDataService.logout();
  }
}
