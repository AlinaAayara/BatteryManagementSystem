import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-dealer-transaction-info',
  templateUrl: './dealer-transaction-info.component.html',
  styleUrls: ['./dealer-transaction-info.component.css']
})
export class DealerTransactionInfoComponent {
  public btnChoosePartyText = Constant.CHOOSE_DEALER;
  public userType = USER_TYPES.Distributor;

}
