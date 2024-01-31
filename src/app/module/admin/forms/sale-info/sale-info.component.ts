import { Component } from "@angular/core";
import { Constant, USER_TYPES } from "src/app/config/constants";

@Component({
  selector: 'app-sale-info',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.css']
})
export class SaleInfoComponent {
  public btnChooseText = Constant.CHOOSE_CUSTOMER;
  public userType = USER_TYPES.Dealer;
}