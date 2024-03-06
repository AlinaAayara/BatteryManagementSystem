import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedDataService } from "src/app/Services/shared-data.service";


@Component({
  selector: 'app-old-serial-no-list',
  templateUrl: './old-serial-no-list.component.html',
  styleUrls: ['./old-serial-no-list.component.css']
})
export class OldSerialNoListComponent implements OnInit, OnChanges {
  public showLoader: boolean = false;
  @Input() public OldSerialNoList: any[];
  @Output() visibleChange = new EventEmitter();
  @Output() SelectedOldSerialNoList = new EventEmitter();

  constructor(
    private _sharedDataService: SharedDataService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['OldSerialNoList']) {
      this.OldSerialNoList = changes['OldSerialNoList']?.currentValue;
    }
  }
  ngOnInit(): void {

  }
  checkElement(e, i) {
    console.log("e", e);
    this.OldSerialNoList[i].Checked = e?.target?.checked;
    console.log("this.OldSerialNoList", this.OldSerialNoList);
  }

  /* This will trigger On final save button  */
  Submit() {
    const SerialNo = this.OldSerialNoList.filter(srno => ['true', true].includes(srno.Checked)).map(s => s.SerialNo);
    this.SelectedOldSerialNoList.emit(SerialNo);
    this.visibleChange.emit(false);
  }


  /* clear purchase whole form on save or on clear */
  cancel() {
    this.visibleChange.emit(false);
  }

  /* this function will trigger when click on edit button on sale info search page */
  edit() {
    // this._sharedDataService.warrantyInfoEdit.subscribe(item => {
    //   this.showCustomerModel(item);
    //   this.showSaleModel(item);
    //   this.WarrantyReturnInfoForm.patchValue(item);
    //   this.isAdd = false;
    // });
  }
}
