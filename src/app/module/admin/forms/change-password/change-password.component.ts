import { Component, OnDestroy, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { PartyInfoService } from "src/app/Services/PartyInfo/party-info.service";
import { LoginService } from "src/app/Services/login.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formField: any;
  public manuallyClearField: boolean = false;
  public partyList;
  constructor(
    private _LoginService: LoginService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnDestroy(): void {
    // this.mySubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.formField = fields;
  }
  submit(Data) {
    if (Data.RePassword != Data.Password) {
      this._sharedDataService.NotieError("Both password should be same");
      return;
    }
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BasicUser";
    delete Data["RePassword"];
    Data.Mode = "5";
    this._LoginService.ChangePassword(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Password Changed successfully !");
        this.manuallyClearField = true;
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }
}
