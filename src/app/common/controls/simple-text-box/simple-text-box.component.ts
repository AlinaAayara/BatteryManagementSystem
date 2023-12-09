import {
  Component, forwardRef, Input, HostListener, ViewChild, ElementRef,
  ChangeDetectorRef, Output, EventEmitter, AfterViewChecked
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: 'app-simple-text-box',
  templateUrl: './simple-text-box.component.html',
  styleUrls: ['./simple-text-box.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimpleTextBoxComponent), multi: true }
  ],
})
export class SimpleTextBoxComponent implements ControlValueAccessor, AfterViewChecked {

  @Input() public label = "";
  @Input() public labelFont18px = false;
  @Input() public errorMessage = "";
  @Input() public form: any;
  @Input() public account = false;
  @Input() public phone = false;
  @Input() public placeholder = "";
  @Input() public pattern = "";
  @Input() public focusAfterFormReset = false;
  @Input() regex: any;
  @Input() maxLength = 0;
  @Input() optional = false;
  @ViewChild("textbox", { static: true }) public textbox: ElementRef;
  @Input() propogateFocusOut = false;
  @Input() textUpperCase = false;
  @Input() public arrowHide: any;
  @Input() disable = false;
  @Input() public disableLabel = false;
  @Input() public seperator = "";
  @Input() public unEvenSeperator = false;
  @Input() public seperationLength = 0;
  @Input() public inputType = "text";
  @Input() minLength = 0;
  @Input() hideError = false;
  @Input() restrictMaxLength = false;
  @Input() touchedOnFocusOut = false;
  @Input() focusInput = false;
  @Input() showErrorMessage = false;
  @Input() isUMNR = false;
  @Input() isUMNRMob = false;
  @Input() preAuthRequired = false;
  public inputValue = "";
  public focus = false;
  @Input() required = false;
  @Input() public isApisForm = false;
  @Input() public isday = true;
  @Input() public ismonth = false;
  @Input() public error = false;
  @Input() public availCarrierHt = false;
  @Input() public isError = false;
  @Output() public focusOnNext = new EventEmitter<any>();
  @Input() isGlobalFlifoSearch = false;
  @Input() validationError = true;
  @Input() isManageControlSet = false;
  @Output() blurOnEmit = new EventEmitter();
  @Output() clearFormFieldValueFromParentCom = new EventEmitter<boolean>();


  constructor(public cd: ChangeDetectorRef) { }
  private propagateChange = (_: any) => { };

  public onTouchedCallback = () => { };

  public writeValue(obj: any) {
    this.inputValue = obj ? obj : "";
    if (this.unEvenSeperator) {
      this.separateUnEvenly();
    }
  }

  public setDisabledState(isDisabled: boolean) {
    this.disableLabel = this.disable = isDisabled;
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public onTouched() {
    this.onTouchedCallback();
  }

  public registerOnTouched(fn:any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewChecked() {
    if (this.focusInput || this.focusAfterFormReset) {
      this.textbox.nativeElement.focus();
      this.focusInput = false;
      this.focusAfterFormReset = false;
      this.cd.detectChanges();
    }
  }
  /*
    Function to set input value selected on focus
    */
  public OnFocusEvent() {
    if (this.isGlobalFlifoSearch) {
      const inputElem = <HTMLInputElement>this.textbox.nativeElement;
      inputElem.select();
    }
  }
  public setFocus(e) {
    if (e && e.relatedTarget && e.relatedTarget.getAttribute("type") === "CLEAR_FIELD" && this.focus) {
      this.clearInput();
    } else {
      this.focus = !this.focus;
    }
    this.focusOnNext.emit(false);
  }

  public inputChanged() {
    if (!this.propogateFocusOut) {
      this.propagateInputChanges();
      if (!this.touchedOnFocusOut) {
        this.onTouched();
      }
    }

  }

  public onBlur() {
    this.blurOnEmit.emit();
    if (this.propogateFocusOut) {
      this.propagateInputChanges();
    }
    this.onTouched();
  }

  public propagateInputChanges() {
    if (this.textUpperCase) {
      this.propagateChange(this.inputValue.toUpperCase());
    } else if (this.unEvenSeperator) {
      this.propagateChange(this.inputValue.split(" ").join(""));
    } else {
      this.propagateChange(this.inputValue);
    }

  }

  public clearInput() {
    this.inputValue = "";
    this.propagateChange(this.inputValue);
    this.onTouched();
    this.focus = false;
    this.clearFormFieldValueFromParentCom.emit(true);
  }

  public separateUnEvenly() {
    let str = "";
    const tempStr = this.inputValue.split(" ").join("");
    for (let i = 0; i < tempStr.length; i++) {
      if (((i === 1) || (i === 4)) && i < tempStr.length) {
        str += " ";
      }
      str += tempStr[i];

    }
    this.inputValue = str.slice(0, this.maxLength);
  }
  public addSeparator() {
    let str = "";
    const tempStr = this.inputValue;
    for (let i = 0; i < tempStr.length; i++) {
      str += tempStr[i];
      if (i !== tempStr.length - 1 && (i + 1) % this.seperationLength === 0) {
        str += this.seperator;
      }
    }
    this.inputValue = str.slice(0, this.maxLength);
  }

  @HostListener("input", ["$event.target"])
  private onInputEvent(input:any) {
    if (input.value) {
      const truncated = input.value.replace(this.regex, "");
      if (truncated !== input.value) {
        this.inputValue = truncated;
      }
      if (this.seperator) {
        this.addSeparator();
      }
      if (this.restrictMaxLength) {
        this.inputValue = this.inputValue.slice(0, this.maxLength);
      }
      if (this.unEvenSeperator) {
        this.separateUnEvenly();
      }
      if (this.isApisForm && this.inputValue.length === this.maxLength) {
        this.focusOnNext.emit(true);
      }
      if (this.isday && this.inputValue.length === this.maxLength) {
        this.focusOnNext.emit(true);
      }
      if (this.ismonth && this.inputValue.length === this.maxLength) {
        this.focusOnNext.emit(true);
      }
    }
    this.inputChanged();
  }

}
