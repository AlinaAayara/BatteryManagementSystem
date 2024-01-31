import { Component } from '@angular/core';
import { Constant, USER_TYPES } from 'src/app/config/constants';

@Component({
  selector: 'app-manufacturer-sale-info',
  templateUrl: './manufacturer-sale-info.component.html',
  styleUrls: ['./manufacturer-sale-info.component.css']
})
export class ManufacturerSaleInfoComponent {
  public btnChooseText = Constant.CHOOSE_DISTRIBUTOR;
  public userType = USER_TYPES.Manufacturer;
}
