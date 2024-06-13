import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/timing-easing";

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
      start: screen.getAllByRole("textbox", { name: "input.params.start" })[0],
      stop: screen.getAllByRole("textbox", { name: "input.params.stop" })[0],
      start_bpm: screen.getAllByRole("textbox", {
        name: "input.params.start_bpm",
      })[0],
      stop_bpm: screen.getAllByRole("textbox", {
        name: "input.params.stop_bpm",
      })[0],
      count: screen.getAllByRole("textbox", { name: "input.params.count" })[0],

      // optional
      bar: screen.getAllByRole("textbox", { name: "input.params.bar" })[0],
      // easing: screen.getAllByRole("button", { name: "input.params.easing" })[0],
      easing_b_point: screen.getAllByRole("textbox", {
        name: "input.params.easing_b_point",
      })[0],
    } as { [x: string]: HTMLElement };

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

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
