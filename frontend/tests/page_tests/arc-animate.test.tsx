import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-animate";

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
      arc: screen.getAllByRole("textbox", { name: "input.arc" })[0],
      start: screen.getAllByRole("textbox", { name: "input.params.start" })[0],
      stop: screen.getAllByRole("textbox", { name: "input.params.stop" })[0],
      delta_x: screen.getAllByRole("textbox", { name: "input.params.delta_x" })[0],
      delta_y: screen.getAllByRole("textbox", { name: "input.params.delta_y" })[0],
      basebpm: screen.getAllByRole("textbox", { name: "input.params.basebpm" })[0],

      // optional
      easing_x: screen.getAllByRole("button", { name: "input.params.easing_x" })[0],
      easing_y: screen.getAllByRole("button", { name: "input.params.easing_y" })[0],
      easing_b_point_x: screen.getAllByRole("textbox", { name: "input.params.easing_b_point_x" })[0],
      easing_b_point_y: screen.getAllByRole("textbox", { name: "input.params.easing_b_point_y" })[0],

      // optional t offset
      offset_t: screen.getAllByRole("textbox", { name: "input.params.offset_t" })[0],
      delta_offset_t: screen.getAllByRole("textbox", { name: "input.params.delta_offset_t" })[0],
      easing_offset_t: screen.getAllByRole("button", { name: "input.params.easing_offset_t" })[0],
      easing_b_point_offset_t: screen.getAllByRole("textbox", { name: "input.params.easing_b_point_offset_t" })[0],

      // optional customize
      infbpm: screen.getAllByRole("textbox", { name: "input.params.infbpm" })[0],
      framerate: screen.getAllByRole("textbox", { name: "input.params.framerate" })[0],
      fake_note_t: screen.getAllByRole("textbox", { name: "input.params.fake_note_t" })[0],
    } as { [x: string]: HTMLElement };

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
    // await user.type(formControl.easing_x, "s");
    // await user.type(formControl.easing_y, "s");
    await user.type(formControl.easing_b_point_x, "0,1,0,1");
    await user.type(formControl.easing_b_point_y, "0,1,0,1");

    // optional t offset
    await user.type(formControl.offset_t, "1000");
    await user.type(formControl.delta_offset_t, "-100");
    // await user.type(formControl.easing_offset_t, "s");
    await user.type(formControl.easing_b_point_offset_t, "0,1,0,1");

    // optional customize
    await user.type(formControl.infbpm, "100000");
    await user.type(formControl.framerate, "120");
    await user.type(formControl.fake_note_t, "1000000");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);




});
