import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slide-in',
  templateUrl: './slide-in.component.html',
  styleUrls: ['./slide-in.component.css']
})
export class SlideInComponent implements OnChanges {
  @Input() showSlideIn: boolean = false;
  @Output() public visibleChange = new EventEmitter<boolean>();

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['showSlideIn']) {
      this.showSlideIn = changes['showSlideIn']?.currentValue;
    }
  }
  changeVisability(isShow) {
    this.showSlideIn = isShow;
    this.visibleChange.emit(this.showSlideIn);
  }
}
