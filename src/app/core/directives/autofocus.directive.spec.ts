import { AutofocusDirective } from "./autofocus.directive";

describe("AutofocusDirective", () => {
  const elRefMock = {
    nativeElement: document.createElement("input")
  };
  it("should create an instance", () => {
    const directive = new AutofocusDirective(elRefMock);
    expect(directive).toBeTruthy();
    directive.ngAfterViewInit();
  });
});
