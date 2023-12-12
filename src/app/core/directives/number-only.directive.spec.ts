import { NumberOnlyDirective } from "./number-only.directive";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule, NgControl } from "@angular/forms";

@Component({
  template: "<input NumberOnly [(ngModel)]='user' > "
})
class TestComponent {
  user = "";
}

describe("NumberOnlyDirective", () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NumberOnlyDirective],
      imports: [FormsModule],
      providers: [NgControl]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css("input"));

  });

  it("should create", () => {
    const directiveEl = fixture.debugElement.query(By.directive(NumberOnlyDirective));
    expect(directiveEl).toBeTruthy();
  });
  it("should allow numbers", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = input.nativeElement;
      el.value = "123";
      el.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("123");
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
  it("should allow only numbers", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elmt = input.nativeElement;
      elmt.value = "some123@#";
      elmt.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("123");
    });
  }));
});
