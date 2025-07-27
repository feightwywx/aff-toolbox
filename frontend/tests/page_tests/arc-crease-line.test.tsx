import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-crease-line";
import { arcPostProcessFields } from "../utils/commonFields";

const formFields = [
  {
    id: "arc",
    type: "textbox",
    name: "input.arc",
  },
  {
    id: "delta_x",
    type: "textbox",
    name: "input.params.delta_x",
  },
  {
    id: "delta_y",
    type: "textbox",
    name: "input.params.delta_y",
  },
  {
    id: "count",
    type: "textbox",
    name: "input.params.count",
  },
  {
    id: "arc_easing",
    type: "button",
    name: "input.params.arc_easing",
  },
  {
    id: "mode",
    type: "button",
    name: "input.params.mode",
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

  it("required", async () => {
    await user.type(
      formControl.arc,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );
    await user.type(formControl.delta_x, "1");
    await user.type(formControl.delta_y, "1");
    await user.type(formControl.count, "10");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("optional", async () => {
    await user.type(
      formControl.arc,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );
    await user.type(formControl.delta_x, "1");
    await user.type(formControl.delta_y, "1");
    await user.type(formControl.count, "10");

    await user.click(formControl.arc_easing);
    await user.click(screen.getAllByRole("option", { name: "sisi" })[0]);

    await user.click(formControl.mode);
    await user.click(screen.getAllByRole("option", { name: "边线模式" })[0]);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("required with post", async () => {
    await user.type(
      formControl.arc,
      "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);"
    );
    await user.type(formControl.delta_x, "1");
    await user.type(formControl.delta_y, "1");
    await user.type(formControl.count, "10");

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
