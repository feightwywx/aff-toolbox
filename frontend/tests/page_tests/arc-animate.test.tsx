import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-animate";

const formFields = [
  {
    id: "arc",
    type: "textbox",
    name: "input.arc"
  },
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
    id: "delta_x",
    type: "textbox",
    name: "input.params.delta_x"
  },
  {
    id: "delta_y",
    type: "textbox",
    name: "input.params.delta_y"
  },
  {
    id: "basebpm",
    type: "textbox",
    name: "input.params.basebpm"
  },
  {
    id: "easing_x",
    type: "button",
    name: "input.params.easing_x"
  },
  {
    id: "easing_y",
    type: "button",
    name: "input.params.easing_y"
  },
  {
    id: "easing_b_point_x",
    type: "textbox",
    name: "input.params.easing_b_point_x"
  },
  {
    id: "easing_b_point_y",
    type: "textbox",
    name: "input.params.easing_b_point_y"
  },
  {
    id: "offset_t",
    type: "textbox",
    name: "input.params.offset_t"
  },
  {
    id: "delta_offset_t",
    type: "textbox",
    name: "input.params.delta_offset_t"
  },
  {
    id: "easing_offset_t",
    type: "button",
    name: "input.params.easing_offset_t"
  },
  {
    id: "easing_b_point_offset_t",
    type: "textbox",
    name: "input.params.easing_b_point_offset_t"
  },
  {
    id: "infbpm",
    type: "textbox",
    name: "input.params.infbpm"
  },
  {
    id: "framerate",
    type: "textbox",
    name: "input.params.framerate"
  },
  {
    id: "fake_note_t",
    type: "textbox",
    name: "input.params.fake_note_t"
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
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.delta_x, "1");
    await user.type(formControl.delta_y, "1");
    await user.type(formControl.basebpm, "100");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(formControl.arc, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.delta_x, "1");
    await user.type(formControl.delta_y, "1");
    await user.type(formControl.basebpm, "100");

    // optional
    await user.click(formControl.easing_x);
    await user.click(screen.getAllByRole("option", { name: "b" })[0]);
    await user.click(formControl.easing_y);
    await user.click(screen.getAllByRole("option", { name: "b" })[0]);
    await user.type(formControl.easing_b_point_x, "0,1,0,1");
    await user.type(formControl.easing_b_point_y, "0,1,0,1");

    // optional t offset
    await user.type(formControl.offset_t, "1000");
    await user.type(formControl.delta_offset_t, "-100");
    // await user.type(formControl.easing_offset_t, "s");
    await user.click(formControl.easing_offset_t);
    await user.click(screen.getAllByRole("option", { name: "b" })[0]);
    await user.type(formControl.easing_b_point_offset_t, "0,1,0,1");

    // optional customize
    await user.type(formControl.infbpm, "100000");
    await user.type(formControl.framerate, "120");
    await user.type(formControl.fake_note_t, "1000000");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
