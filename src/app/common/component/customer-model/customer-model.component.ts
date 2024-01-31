import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-model',
  templateUrl: './customer-model.component.html',
  styleUrls: ['./customer-model.component.css']
})
export class CustomerModelComponent implements OnChanges {
  @Input() public selectedCustomer;
  @Output() public removeCustomer = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['selectedCustomer']) {
      this.selectedCustomer = changes['selectedCustomer']?.currentValue;
    }
  }
  removeSelectedCustomer() {
    this.removeCustomer.next("");
  }
}
