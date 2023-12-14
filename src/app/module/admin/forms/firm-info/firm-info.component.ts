import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { FirmInfoService } from 'src/app/Services/firm-info.service';
import { LoginService } from 'src/app/Services/login.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-firm-info',
  templateUrl: './firm-info.component.html',
  styleUrls: ['./firm-info.component.css']
})
export class FirmInfoComponent {
  FirmInfoForm: FormGroup;
  showAddBtn: boolean = false;

  constructor(private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _firmInfoService: FirmInfoService,
    public sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.FirmInfoForm = this._FormBuilder.group({
      FirmName: ["", Validators.required],
      FirmAddress: [""],
      ActivationDate: ["", Validators.required],
      ExpiryDate: ["", Validators.required]
    });
    this.getFirmData();
  }

  getFirmData(): any {
    this._firmInfoService.getFirm(this.getRequestBody()).subscribe({
      next: data => {
        if (data?.length) {
          this.setFormValue(data?.[0])
          this.showAddBtn = false;
          this.disbleAllControl();
        }
        else {
          this.showAddBtn = true;
        }
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
  AddFirm(): any {
    this._firmInfoService.addFirm(this.RequestBody()).subscribe({
      next: data => {
        Swal.fire({
          title: "Done!",
          text: "Firm registered successfully!",
          icon: "success"
        });
        this.FirmInfoForm.reset();
        this.showAddBtn = false;
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

  public RequestBody() {
    return {
      Mode: "0",
      FirmName: this.FirmInfoForm.get("FirmName")?.value,
      FirmAddress: this.FirmInfoForm.get("FirmAddress")?.value,
      ActivationDate: this.FirmInfoForm.get("ActivationDate")?.value,
      ExpiryDate: this.FirmInfoForm.get("ExpiryDate")?.value,
      MethodName: "InUp_FirmInfo"
    }
  }
  public getRequestBody() {
    return {
      Mode: "3",
      MethodName: "InUp_FirmInfo"
    }
  }
  public setFormValue(data) {
    this.FirmInfoForm.setValue({
      FirmName: data.FirmName,
      FirmAddress: data.FirmAddress,
      ActivationDate: data.ActivationDate,
      ExpiryDate: data.ExpiryDate
    })
  }
  public disbleAllControl() {
    for (var control in this.FirmInfoForm.controls) {
      this.FirmInfoForm.controls[control].disable();
    }
  }
}