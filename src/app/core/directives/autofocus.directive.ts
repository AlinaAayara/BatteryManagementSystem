import { Directive, AfterViewInit, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appAutofocus]"
})
export class AutofocusDirective implements AfterViewInit {
  @Input() autoFocus = true;
  constructor(private el: ElementRef) {
  }

  public ngAfterViewInit() {
    if (this.autoFocus) {
      this.el.nativeElement.focus();
    }
  }

}
