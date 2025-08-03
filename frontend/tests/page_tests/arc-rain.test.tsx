import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-rain";
import { arcPostProcessFields } from "../utils/commonFields";

const formFields = [
  {
    id: "start",
    type: "textbox",
    name: "input.params.start"
  },
  {
    id: "stop",
    type: "textbox",
    name: "input.params.stop"
  },
  {
    id: "step",
    type: "textbox",
    name: "input.params.step"
  },
  {
    id: "dropLength",
    type: "textbox",
    name: "input.params.dropLength"
  },
  {
    id: "mode",
    type: "button",
    name: "input.rainLimitMode"
  },
  {
    id: "x_limit_range",
    type: "textbox",
    name: "input.params.x_limit_range"
  },
  {
    id: "y_limit_range",
    type: "textbox",
    name: "input.params.y_limit_range"
  },
  ...arcPostProcessFields
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
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.step, "10");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.step, "10");

    // optional
    await user.type(formControl.dropLength, "10");
    await user.type(formControl.x_limit_range, "10");
    await user.type(formControl.y_limit_range, "10");
    await user.click(formControl.mode);
    await user.click(screen.getAllByRole("option", { name: "input.rainLimitMode.enwidenbyd" })[0]);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000)

  it("required with post", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.step, "10");

    // post
    await user.click(formControl.mirror);
    await user.click(formControl.straighten_x);
    await user.click(formControl.straighten_y);
    await user.click(formControl.connector);
    await user.click(formControl.position_filter_even);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all with post", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.step, "10");

    // optional
    await user.type(formControl.dropLength, "10");
    await user.type(formControl.x_limit_range, "10");
    await user.type(formControl.y_limit_range, "10");
    await user.click(formControl.mode);
    await user.click(screen.getAllByRole("option", { name: "input.rainLimitMode.enwidenbyd" })[0]);

    // post
    await user.click(formControl.mirror);
    await user.click(formControl.straighten_x);
    await user.click(formControl.straighten_y);
    await user.click(formControl.connector);
    await user.click(formControl.position_filter_even);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000)
});
