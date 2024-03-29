declare const require: any;
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FormLogin: FormGroup;
  constructor(private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _loginService: LoginService,
    public sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {

    this.FormLogin = this._FormBuilder.group({
      UserName: ["", Validators.required],
      Password: ["", Validators.required]
    });

  }
  Login(): any {
    this._loginService.GetLoginInfo(this.LoginObj()).subscribe({
      next: data => {
        this.sharedDataService.setToken(data.value);
        this._Router.navigate(['/Home']);
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: "Invalid username or password !",
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
    });
  }

  public LoginObj() {
    return {
      Mode: "4",
      UserName: this.FormLogin.get("UserName")?.value,
      Password: this.FormLogin.get("Password")?.value,
      MethodName: "InUp_BasicUser"
    }
  }
}
