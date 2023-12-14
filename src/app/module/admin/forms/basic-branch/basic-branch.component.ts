
import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";
import { fields } from "./fields";
import { BasicBranchService } from "src/app/Services/BasicBranch/basic-branch.service";

@Component({
  selector: 'app-basic-branch',
  templateUrl: './basic-branch.component.html',
  styleUrls: ['./basic-branch.component.css']
})
export class BasicBranchComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public branchList;
  constructor(
    private _basicBranchService: BasicBranchService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = fields;
    this.getList();
  }
  submit(Data) {
    this.manuallyClearField = false;
    Data.MethodName = "InUp_BasicBranch";
    this._basicBranchService.AddBranch(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Branch saved successfully !");
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._basicBranchService.GetBranch(this.getRequestBody()).subscribe({
      next: data => {
        this.branchList = data;
      },
      error: error => {
        //this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicBranch"
    }
  }

}
