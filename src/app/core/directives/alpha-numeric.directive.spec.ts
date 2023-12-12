import { AlphaNumericDirective } from "./alpha-numeric.directive";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule, NgControl } from "@angular/forms";
@Component({
  template: "<input AlphaNumeric  [(ngModel)]='user' > "
})
class TestComponent {
  user = "";
}

describe("AlphaNumericDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AlphaNumericDirective],
      imports: [FormsModule],
      providers: [NgControl]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css("input"));
  });

  it("should create", () => {
    const directiveEl = fixture.debugElement.query(By.directive(AlphaNumericDirective));
    expect(directiveEl).toBeTruthy();

  });
  it("should allow alpha numeric", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = input.nativeElement;
      el.value = "some123";
      el.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("some123");
    });
  }));
  it("should restrict special characters", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = input.nativeElement;
      element.value = "#$%^@#";
      element.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("");
    });
  }));
  it("should allow only alpha numeric", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elmt = input.nativeElement;
      elmt.value = "some123@#";
      elmt.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("some123");
    });
  }));
});
