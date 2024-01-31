import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-distributor-model',
  templateUrl: './distributor-model.component.html',
  styleUrls: ['./distributor-model.component.css']
})
export class DistributorModelComponent {
  @Input() public selectedDistributor;
  @Output() public removeDistributor = new EventEmitter();

  removeSelectedDistributor() {
    this.removeDistributor.next("");
  }
}
