import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/Services/Http/http.service';
import { HomeService } from 'src/app/Services/home/home.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { CurrentUser } from 'src/app/core/models/current-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public isSideBarActive: boolean = false;
  public isFirstTimeClicked: boolean = false;
  @ViewChild('root') rootDiv: ElementRef;
  public currentUser: CurrentUser;
  constructor(
    private _httpService: HttpService,
    private _homeService: HomeService,
    private _sharedDataService: SharedDataService
  ) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this._homeService.getCurrentUser().subscribe({
      next: data => {
        this._sharedDataService.currentUser = data;
        this.currentUser = this._sharedDataService.currentUser;
        localStorage.setItem("currentUser", JSON.stringify(data));
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

  setSideBarActive(isBtnClick: boolean) {
    //let classList = this.rootDiv.nativeElement.className;
    this.isFirstTimeClicked = isBtnClick ? isBtnClick : this.isFirstTimeClicked;
    this.isSideBarActive = isBtnClick ? !this.isSideBarActive : (!isBtnClick && this.isSideBarActive && !this.isFirstTimeClicked) ? false : this.isSideBarActive;
    setTimeout(() => {
      this.isFirstTimeClicked = false;
    }, 1000);

  }

  logout(){
    this._sharedDataService.logout();
  }
}

