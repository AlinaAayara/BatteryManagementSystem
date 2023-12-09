import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/Http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _httpService: HttpService) {

  }
  ngOnInit(): void {
    this._httpService.getCurrentUser(null).subscribe(()=>{

    });
  }

}
