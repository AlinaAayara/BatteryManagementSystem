import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
@Directive({
    selector: "[appDecimaNumber]"
})
export class ValidateDecimalDirective {
    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys = ["Backspace", "Tab", "End", "Home", "ArrowLeft", "ArrowRight", "Del", "Delete"];

    constructor(private el: ElementRef) {
    }
    @HostListener("keydown", ["$event"])
    @HostListener("blur", ["$event"])
    onEvent(event) {
        if (event.type === "keydown") {
            this.onKeyDown(event);
        } else if (event.type === "blur") {
            this.el.nativeElement.value = this.el.nativeElement.value !== "" ? (parseFloat(this.el.nativeElement.value)).toFixed(2) : "";
            this.el.nativeElement.value = this.el.nativeElement.value === "NaN" ? (0).toFixed(2) : this.el.nativeElement.value;
        }

    }
    onKeyDown(event: KeyboardEvent) {

        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current: string = this.el.nativeElement.value;
        const position = this.el.nativeElement.selectionStart;
        const next: string = [current.slice(0, position), event.key === "Decimal" ? "." : event.key, current.slice(position)].join("");
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
