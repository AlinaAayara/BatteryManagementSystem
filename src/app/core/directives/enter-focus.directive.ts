import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEnterFocus]'
})
export class EnterFocusDirective {
  private el: ElementRef;
  @Input() onReturn: string;
  public textBoxList;
  public currentBoxNumber;
  public nextBox;
  constructor(private _el: ElementRef) {
    this.el = this._el;
  }
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if ((e.which == 13 || e.keyCode == 13)) {
      this.textBoxList = document.getElementsByClassName(".enter-focus");
      this.currentBoxNumber = this.textBoxList.index(this);
      if (this.textBoxList[this.currentBoxNumber + 1] != null) {
        this.nextBox = this.textBoxList[this.currentBoxNumber + 1]
        this.nextBox.focus();
        this.nextBox.select();
        e.preventDefault();
        return false
      }
      else {
        this.nextBox = this.textBoxList[0];
        this.nextBox.focus();
        this.nextBox.select();
        e.preventDefault();
      }
    }

  }
}
