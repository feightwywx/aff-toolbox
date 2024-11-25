import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-envelope";

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
      arc1: screen.getAllByRole("textbox", { name: "input.arc1" })[0],
      arc2: screen.getAllByRole("textbox", { name: "input.arc2" })[0],
      count: screen.getAllByRole("textbox", { name: "input.params.count" })[0],

      // optional
      // envelope_mode: screen.getAllByRole("button", { name: "input.params.envelope_mode" })[0],

      // arc post process
      mirror: screen.getAllByRole("checkbox", { name: "input.post.mirror" })[0],
      straighten_x: screen.getAllByRole("checkbox", { name: "input.post.straighten_x" })[0],
      straighten_y: screen.getAllByRole("checkbox", { name: "input.post.straighten_y" })[0],
      connector: screen.getAllByRole("checkbox", { name: "input.post.connector" })[0],
      position_filter_none: screen.getAllByRole("radio", { name: "input.post.position_filter.none" })[0],
      position_filter_even: screen.getAllByRole("radio", { name: "input.post.position_filter.even" })[0],
      position_filter_odd: screen.getAllByRole("radio", { name: "input.post.position_filter.odd" })[0],

    } as { [x: string]: HTMLElement };

    formSubmit = screen.getAllByRole("button", { name: "submit" })[0];
    formResult = screen.getAllByTestId("result")[0];
  });

  afterEach(() => {
    u(); // unmount
  });

  it("required", async () => {
    await user.type(formControl.arc1, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.arc2, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.count, "10");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("required with post", async () => {
    await user.type(formControl.arc1, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
    await user.type(formControl.arc2, "arc(0,1000,0.00,1.00,s,1.00,0.00,0,none,false);");
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
