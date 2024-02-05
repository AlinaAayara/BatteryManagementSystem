import { Component, OnInit } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-party-transaction-info',
  templateUrl: './party-transaction-info.component.html',
  styleUrls: ['./party-transaction-info.component.css']
})
export class PartyTransactionInfoComponent {
  public btnChoosePartyText = Constant.CHOOSE_PARTY;
  public userType = USER_TYPES.Dealer;
}
