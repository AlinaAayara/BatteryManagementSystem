import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Constant } from 'src/app/config/constants';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit, OnChanges {
  @Input() public SearchResult;
  @Input() public searchFormName;
  @Output() public delete = new EventEmitter();
  @Output() public edit = new EventEmitter();
  public id;
  public isWrite: boolean = false;
  public isDelete: boolean = false;
  Object = Object;
  constructor(
    private route: ActivatedRoute,
    public _sharedDataService: SharedDataService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isWrite = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISWRITE);
    this.isDelete = this._sharedDataService.checkWriteDeleteAccess(this.id, Constant.ISDELETE);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['SearchResult']) {
      this.SearchResult = changes['SearchResult']?.currentValue;
    }
  }

  deleteItem(item) {
    this._sharedDataService.deleteRecord(this.deleteBody(Object.values(item)[0])).subscribe({
      next: data => {
        this._sharedDataService.success("Deleted successfully !");
        this.removeItem(Object.values(item)[0]);
      },
      error: error => {
        this._sharedDataService.error(error)
      }
    });;
  }

  editItem(item) {
    this.edit.emit(item);
  }

  /* delete request body */
  deleteBody(id) {
    return {
      SubMenuID: this.id,
      PrimaryValue: id,
      MethodName: "deleteRecord"
    }
  }
  /* manually remove item from search result */
  removeItem(id) {
    this.SearchResult = this.SearchResult.filter((searchid) => { Object.values(searchid)[0] != id });
  }

}
