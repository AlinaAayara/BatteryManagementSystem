import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent {
  public btnChoosePartyText = Constant.CHOOSE_PARTY;
  public userType = USER_TYPES.Dealer;
}