import { Component, OnInit } from '@angular/core';
import { basiccneter } from "../../../../config/form-builder/basic-center/basic-center";
@Component({
  selector: 'app-basic-center',
  templateUrl: './basic-center.component.html',
  styleUrls: ['./basic-center.component.css']
})
export class BasicCenterComponent implements OnInit {
  public basicCneter = basiccneter;
  public institute = "1";
  
  ngOnInit(): void {
    this.basicCneter = basiccneter.filter(form => form.institute === this.institute || "Default");
  }

}
