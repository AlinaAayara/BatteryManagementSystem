import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-distributor-transaction-info',
  templateUrl: './distributor-transaction-info.component.html',
  styleUrls: ['./distributor-transaction-info.component.css']
})
export class DistributorTransactionInfoComponent {
  public btnChoosePartyText = Constant.CHOOSE_DISTRIBUTOR;
  public userType = USER_TYPES.Manufacturer;
}
