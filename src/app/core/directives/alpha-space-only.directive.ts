import { Directive, HostListener,Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[AlphaOnlyspace]"
})
export class AlphaSpaceOnlyDirective {
  public truncated: any  = "";
  constructor(private control: NgControl) { }

  @HostListener("input", ["$event.target"])
  private onInputEvent(input) {
    /* istanbul ignore else */
    if (input.value) {
      this.truncated = input.value.replace(/[^a-zA-Z_ ]/g, "");
      /* istanbul ignore else */
      if (this.truncated !== input.value) {
        if (this.control.valueAccessor) {
          this.control.valueAccessor.writeValue(this.truncated); // write to model
        }
        this.control.viewToModelUpdate(this.truncated);        // write to view
        if (this.control.control) {
          this.control.control.setValue(this.truncated);  // send to control
        }
      }
    }
  }
}
