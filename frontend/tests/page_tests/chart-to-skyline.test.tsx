import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/chart-to-skyline";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux");

describe("form test", () => {
  const user = userEvent.setup();
  let u: () => void; // local unmount
  let formControl: { [x: string]: HTMLElement };
  let formSubmit: HTMLElement;
  let formResult: HTMLElement;

  beforeEach(() => {
    const { unmount } = render(<ToolPage />);
    u = unmount;
    formControl = {
      notes: screen.getAllByRole("textbox", { name: "input.notes" })[0],
      arc_head_scale: screen.getAllByRole("textbox", {
        name: "input.params.arc_head_scale",
      })[0],
      arctap_scale: screen.getAllByRole("textbox", {
        name: "input.params.arctap_scale",
      })[0],
      tap_scale: screen.getAllByRole("textbox", {
        name: "input.params.tap_scale",
      })[0],
    } as { [x: string]: HTMLElement };

    formSubmit = screen.getAllByRole("button", { name: "submit" })[0];
    formResult = screen.getAllByTestId("result")[0];
  });

  afterEach(() => {
    u(); // unmount
  });

  it("required", async () => {
    await user.type(
      formControl.notes,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("optional", async () => {
    await user.type(
      formControl.notes,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );
    await user.type(formControl.arc_head_scale, "1.5");
    await user.type(formControl.arctap_scale, "1.3");
    await user.type(formControl.tap_scale, "1.1");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
