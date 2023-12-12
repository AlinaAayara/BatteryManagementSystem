import { AfterViewInit, Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";
import { directiveList } from "src/app/config/constants";

@Directive({
  selector: "[NumberOnly]"
})
export class NumberOnlyDirective implements AfterViewInit{
  public regex = /[^0-9]*/g;
  @Input() directiveName: string;
  @Input() autoFocus = true;
  @Input() regexForInputValidator: any;

  // Allow decimal numbers and negative values
  private regexForDecimalNumbers: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeysForDecimalNumbers = ["Backspace", "Tab", "End", "Home", "ArrowLeft", "ArrowRight", "Del", "Delete"];

  constructor(private control: NgControl,private el: ElementRef) {
  }

  @HostListener("input", ["$event.target"])
  private onInputEvent(input) {


    if (this.directiveName === directiveList.NumberOnly) {
      /* istanbul ignore else */
      if (input.value) {
        const truncated = input.value.replace(this.regex, "");
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


    if (this.directiveName === directiveList.AlphaNumeric) {
      if (input.value) {
        const truncated = input.value.replace(/[^0-9a-zA-Z]*/g, "");
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

    if (this.directiveName === directiveList.AlphaOnly) {
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


if (this.directiveName === directiveList.AlphaOnlyspace) {
  if (input.value) {
    const truncated = input.value.replace(/[^a-zA-Z_ ]/g, "");
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

    

    if (this.directiveName === directiveList.inputValidator) {
      if (input.value) {
        const truncated = input.value.replace(this.regexForInputValidator, "");
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

   

    if (this.directiveName === directiveList.AlphaOnly) {
      
    }

    if (this.directiveName === directiveList.AlphaOnly) {
      
    }


  }
  @HostListener("keydown", ["$event"])
    @HostListener("blur", ["$event"])
    onEvent(event) {
      if (this.directiveName === directiveList.appDecimaNumber) {
        if (event.type === "keydown") {
          this.onKeyDown(event);
      } else if (event.type === "blur") {
          this.el.nativeElement.value = this.el.nativeElement.value !== "" ? (parseFloat(this.el.nativeElement.value)).toFixed(2) : "";
          this.el.nativeElement.value = this.el.nativeElement.value === "NaN" ? (0).toFixed(2) : this.el.nativeElement.value;
      }
      }

       

    }
    onKeyDown(event: KeyboardEvent) {
      if (this.directiveName === directiveList.appDecimaNumber) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeysForDecimalNumbers.indexOf(event.key) !== -1) {
            return;
        }
        const current: string = this.el.nativeElement.value;
        const position = this.el.nativeElement.selectionStart;
        const next: string = [current.slice(0, position), event.key === "Decimal" ? "." : event.key, current.slice(position)].join("");
        if (next && !String(next).match(this.regexForDecimalNumbers)) {
            event.preventDefault();
        }
    }
  }
  trapFocus(element){
    const focusable1 = element.querySelectorAll('button,input[type="text"],input[type="radio"], input[type="checkbox"],select');
    const focusable = Array.from(focusable1).filter((el:any)=> !el.disabled)
    const firstFocusable : any =focusable[0];
    const lastFocusable :any =focusable[focusable.length -1];
    element.addEventListener('keydown',function(e){
      var isTabpressed =e.keyCode === 9;
      if(!isTabpressed) return;
      if(e.shiftKey){
        if(document.activeElement === firstFocusable){
          lastFocusable.focus()
          e.preventDefault()
        }
      } else{
        if(document.activeElement === lastFocusable){
          firstFocusable.focus()
          e.preventDefault()
        }
      }
    });
  }
  public ngAfterViewInit() {
    if (this.directiveName === directiveList.appAutofocus && this.autoFocus) {
        this.el.nativeElement.focus();
    }
    if (this.directiveName === directiveList.appTrapFocus) {
      this.trapFocus(this.el.nativeElement);
    }
  }
}
