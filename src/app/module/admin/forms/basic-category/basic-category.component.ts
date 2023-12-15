import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicCategoryService } from 'src/app/Services/BasicCategory/basic-category.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { directiveList } from 'src/app/config/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-category',
  templateUrl: './basic-category.component.html',
  styleUrls: ['./basic-category.component.css']
})
export class BasicCategoryComponent implements OnInit {
  formField: any;
  public manuallyClearField: boolean = false;
  public categoryList;
  public showLoader: boolean = false;
  constructor(
    private _basicCategoryService: BasicCategoryService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.formField = [
      {
        fieldName: "CategoryName",
        validation: [Validators.required],
        placeholder: "Category Name",
        label: "Category Name",
        isVisible: true,
        directiveName: directiveList.AlphaOnly
      },
      {
        fieldName: "CategoryID",
        validation: null,
        placeholder: "CategoryID",
        label: "CategoryID",
        isVisible: false
      }
    ]

    this.getList();
  }
  submit(Data) {
    this.showLoader = true;
    Data.MethodName = "InUp_BasicCategory";
    this._basicCategoryService.AddCategory(Data).subscribe({
      next: data => {
        this._sharedDataService.success("Category saved successfully !");
        this.manuallyClearField = true;
        this.getList();
        this.showLoader = false;
      },
      error: error => {
        this.showLoader = false;
        this._sharedDataService.error(error);
      }
    });
  }

  getList() {
    this._basicCategoryService.GetCategory(this.getRequestBody()).subscribe({
      next: data => {
        this.categoryList = data;
      },
      error: error => {
        this._sharedDataService.error(error);
      }
    });
  }
  public getRequestBody() {
    return {
      MethodName: "Search_BasicCategory"
    }
  }

}
