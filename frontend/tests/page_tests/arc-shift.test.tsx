import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-shift";
import { arcPostProcessFields } from "../utils/commonFields";

const formFields = [
  {
    id: "arc",
    type: "textbox",
    name: "input.arc"
  },
  {
    id: "x_offset",
    type: "textbox",
    name: "input.params.x_offset"
  },
  {
    id: "y_offset",
    type: "textbox",
    name: "input.params.y_offset"
  },
  ...arcPostProcessFields,
];

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux");

describe("form test", () => {
  const user = userEvent.setup();
  let u: () => void; // local unmount
  let formControl: { [x: string]: HTMLElement } = {};
  let formSubmit: HTMLElement;
  let formResult: HTMLElement;

  beforeEach(() => {
    const { unmount } = render(<ToolPage />);
    u = unmount;

    for (const meta of formFields) {
      formControl[meta.id] = screen.getByRole(meta.type, { name: meta.name });
    }

    formSubmit = screen.getAllByRole("button", { name: "submit" })[0];
    formResult = screen.getAllByTestId("result")[0];
  });

  afterEach(() => {
    u(); // unmount
  });

  it("x only", async () => {
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.x_offset, "0.5");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("y only", async () => {
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.y_offset, "-0.5");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.x_offset, "0.5");
    await user.type(formControl.y_offset, "-0.5");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all with post", async () => {
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.x_offset, "0.5");
    await user.type(formControl.y_offset, "-0.5");

    // post
    await user.click(formControl.mirror);
    await user.click(formControl.straighten_x);
    await user.click(formControl.straighten_y);
    await user.click(formControl.connector);
    await user.click(formControl.position_filter_even);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
