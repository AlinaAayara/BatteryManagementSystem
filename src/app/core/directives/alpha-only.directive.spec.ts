import { AlphaOnlyDirective } from "./alpha-only.directive";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule, NgControl } from "@angular/forms";
@Component({
  template: "<input AlphaOnly [(ngModel)]='user' > "
})
class TestComponent {
  user = "";
}

describe("AlphaOnlyDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AlphaOnlyDirective],
      imports: [FormsModule],
      providers: [NgControl]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css("input"));
  });

  it("should create", () => {
    const directiveEl = fixture.debugElement.query(By.directive(AlphaOnlyDirective));
    expect(directiveEl).toBeTruthy();

  });
  it("should allow alpha", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = input.nativeElement;
      el.value = "abcd";
      el.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("abcd");
    });
  }));
  it("should restrict special characters", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elmt = input.nativeElement;
      elmt.value = "#$%^@#";
      elmt.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("");
    });
  }));
  it("should allow only alpha", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = input.nativeElement;
      element.value = "some123@#";
      element.dispatchEvent(new Event("input"));
      expect(fixture.componentInstance.user).toBe("some");
    });
  }));
});
