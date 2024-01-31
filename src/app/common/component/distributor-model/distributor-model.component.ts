import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-distributor-model',
  templateUrl: './distributor-model.component.html',
  styleUrls: ['./distributor-model.component.css']
})
export class DistributorModelComponent implements OnChanges {
  @Input() public selectedDistributor;
  @Output() public removeDistributor = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['selectedDistributor']) {
      this.selectedDistributor = changes['selectedDistributor']?.currentValue;
    }
  }
  
  removeSelectedDistributor() {
    this.removeDistributor.next("");
  }
}
