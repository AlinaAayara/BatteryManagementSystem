import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicGroupService } from 'src/app/Services/BasicGroup/basic-group.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-basic-group',
  templateUrl: './basic-group.component.html',
  styleUrls: ['./basic-group.component.css']
})
export class BasicGroupComponent implements OnInit {
  BasicGroupForm: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private _BasicGroupService: BasicGroupService,
    private _sharedDataService: SharedDataService
  ) {

  }

  ngOnInit(): void {
    this.basicGroupFormBuilder();
    this.getSubMenuList();
  }
  basicGroupFormBuilder() {
    this.BasicGroupForm = this._FormBuilder.group({
      GroupID: [""],
      GroupName: ["", Validators.required],
      BasicSubGroupList: [[], Validators.required]
    });
  }


  /* get sub menu list  */
  getSubMenuList() {
    this._BasicGroupService.getGroup(this.getGroupRequestBody()).subscribe({
      next: data => {
        this.BasicGroupForm.get("BasicSubGroupList")?.setValue(data);
      },
      error: error => {
        this.BasicGroupForm.get("BasicSubGroupList")?.setValue([]);
      }
    });
  }
  /* request body for category list dropdown api call */
  public getGroupRequestBody() {
    return {
      MethodName: "Sel_BasicGroup_ByID"
    }
  }
  /* This will trigger On final save button  */
  Submit(e) {
    // this.showLoader = true;
    // this._purchaseInfoService.AddPurchase(generatePostRequestBody(this.PurchaseInfoForm.value, this.isAdd ? "0" : "1")).subscribe({
    //   next: data => {
    //     this.showLoader = false;
    //     this._sharedDataService.success("Purchase saved successfully !");
    //     this.clearPurchase();
    //   },
    //   error: error => {
    //     this.showLoader = false;
    //     this._sharedDataService.error(error);
    //   }
    // });

  }

  checkElement(e, i) {
    console.log("e", e);
    // this.WarrentyReturnInfoList[i].Checked = e?.target?.checked;
    // console.log("this.WarrentyReturnInfoList", this.WarrentyReturnInfoList);
    // this.setCheckedWarrantyList();
  }
}
