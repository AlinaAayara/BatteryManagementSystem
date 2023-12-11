import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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
  Object = Object;
  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['SearchResult']) {
      this.SearchResult = changes['SearchResult']?.currentValue;
      console.log("this.SearchResult", this.SearchResult);
    }
  }

  deleteItem(item) {
    this.delete.emit(item);
  }

  editItem(item) {
    this.edit.emit(item);
  }

}
