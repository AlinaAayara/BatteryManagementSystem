import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-distributor-sale-info',
  templateUrl: './distributor-sale-info.component.html',
  styleUrls: ['./distributor-sale-info.component.css']
})
export class DistributorSaleInfoComponent {
  public btnChooseText = Constant.CHOOSE_DEALER;
  public userType = USER_TYPES.Distributor;
}
