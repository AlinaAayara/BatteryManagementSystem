import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-manufacturer-purchase-info',
  templateUrl: './manufacturer-purchase-info.component.html',
  styleUrls: ['./manufacturer-purchase-info.component.css']
})
export class ManufacturerPurchaseInfoComponent {
  public btnChoosePartyText = Constant.CHOOSE_DISTRIBUTOR;
  public userType = USER_TYPES.Manufacturer;
}
