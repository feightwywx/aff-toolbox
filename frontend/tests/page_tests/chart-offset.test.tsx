import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/chart-offset";

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
      offset: screen.getAllByRole("textbox", {
        name: "input.params.offset",
      })[0],

      // optional
      allowMinusTimingNote: screen.getAllByRole("checkbox", {
        name: "input.params.allowMinusTimingNote",
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
    await user.type(formControl.offset, "200");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(
      formControl.notes,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );
    await user.type(formControl.offset, "200");

    // optional
    await user.click(formControl.allowMinusTimingNote);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
