import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicCategoryService } from 'src/app/Services/BasicCategory/basic-category.service';
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
  constructor(
    private _basicCategoryService: BasicCategoryService
  ) {

  }
  ngOnInit(): void {
    this.formField = [
      {
        fieldName: "CategoryName",
        validation: [Validators.required],
        placeholder: "Category Name",
        label: "Category Name",
        isVisible: true
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
    Data.MethodName = "InUp_BasicCategory";
    this._basicCategoryService.AddCategory(Data).subscribe({
      next: data => {
        Swal.fire({
          title: "Done!",
          text: "Firm registered successfully!",
          icon: "success"
        });
        this.manuallyClearField = true;
        this.getList();
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
    });
  }

  getList() {
    this._basicCategoryService.GetCategory(this.getRequestBody()).subscribe({
      next: data => {
        this.categoryList = data;
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
    });
  }
  public getRequestBody() {
    return {
      FormData: {
      },
      MethodName: "Search_BasicCategory"
    }
  }

}
