import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { PartyInfoService } from "src/app/Services/PartyInfo/party-info.service";

@Component({
  selector: 'app-party-info',
  templateUrl: './party-info.component.html',
  styleUrls: ['./party-info.component.css']
})
export class PartyInfoComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public partyList;
  constructor(
    private _partyInfoService: PartyInfoService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_PartyInfo";
    this._partyInfoService.AddParty(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Party saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        this.emitParty(data?.[0]);
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._partyInfoService.GetParty(this.getRequestBody()).subscribe({
      next: data => {
        this.partyList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_PartyInfo"
    }
  }
  /* This function will emit added party or seleceted party
    1) This will used during purchase info
  */
  emitParty(Party) {
    this._sharedDataService.getSelectedParty.next(Party);
  }
}
