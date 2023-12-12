import { Directive, ElementRef, AfterViewInit, Input  } from '@angular/core';

@Directive({
  selector: '[appTrapFocus]'
})
export class TrapFocusDirective implements AfterViewInit{
  //@Input() appTrapFocus = true;

  constructor(private el:ElementRef) { }
  ngAfterViewInit(){
    this.trapFocus(this.el.nativeElement);
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

}
