import { InputValidatorDirective } from "./input-validator.directive";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NgControl, FormsModule } from "@angular/forms";
@Component({
  template: "<input inputValidator  [regex]='inputRegex' [(ngModel)]='user' > "
})
class TestComponent {
  public inputRegex = /[^a-zA-Z]/g;
  user = "";
}

describe("InputValidatorDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, InputValidatorDirective],
      imports: [FormsModule],
      providers: [NgControl]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css("input"));
    fixture.detectChanges();

  });

  it("should create", () => {
    const directiveEl = fixture.debugElement.query(By.directive(InputValidatorDirective));
    expect(directiveEl).toBeTruthy();

  });
  it("should be ok", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = input.nativeElement;
      el.value = "Abc123";
      el.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("Abc");
    });
  }));
});
