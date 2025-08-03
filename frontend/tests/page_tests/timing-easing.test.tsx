import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/timing-easing";

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
    id: "start_bpm",
    type: "textbox",
    name: "input.params.start_bpm"
  },
  {
    id: "stop_bpm",
    type: "textbox",
    name: "input.params.stop_bpm"
  },
  {
    id: "count",
    type: "textbox",
    name: "input.params.count"
  },
  {
    id: "bar",
    type: "textbox",
    name: "input.params.bar"
  },
  {
    id: "easing",
    type: "button",
    name: "input.params.easing"
  },
  {
    id: "easing_b_point",
    type: "textbox",
    name: "input.params.easing_b_point"
  }
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
    await user.type(formControl.start_bpm, "200");
    await user.type(formControl.stop_bpm, "200");
    await user.type(formControl.count, "10");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.start_bpm, "200");
    await user.type(formControl.stop_bpm, "200");
    await user.type(formControl.count, "10");

    // optional
    await user.type(formControl.bar, "4.00");
    await user.type(formControl.easing_b_point, "0,1,0,1");
    await user.click(formControl.easing);
    await user.click(screen.getAllByRole("option", { name: "b" })[0]);

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
