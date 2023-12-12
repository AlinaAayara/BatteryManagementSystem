import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[AlphaOnly]"
})
export class AlphaOnlyDirective {
  constructor(private control: NgControl) { }

  @HostListener("input", ["$event.target"])
  private onInputEvent(input) {
    /* istanbul ignore else */
    if (input.value) {
      const truncated = input.value.replace(/[^a-zA-Z]/g, "");
      /* istanbul ignore else */
      if (truncated !== input.value) {
        if (this.control.valueAccessor) {
          this.control.valueAccessor.writeValue(truncated); // write to model
        }
        this.control.viewToModelUpdate(truncated);        // write to view
        if (this.control.control) {
          this.control.control.setValue(truncated);  // send to control
        }
      }
      
    }
    
  }
}
