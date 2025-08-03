import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/sc-blink";

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
    id: "count",
    type: "textbox",
    name: "input.params.count"
  },
  {
    id: "sc_x",
    type: "textbox",
    name: "input.params.sc_x"
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

  it("all required", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.count, "10");
    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("all", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.count, "10");
    await user.type(formControl.sc_x, "2");
    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("required missing", async () => {
    // await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    await user.type(formControl.count, "10");
    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("required missing", async () => {
    await user.type(formControl.start, "0");
    // await user.type(formControl.stop, "1000");
    await user.type(formControl.count, "10");
    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);

  it("required missing", async () => {
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "1000");
    // await user.type(formControl.count, "10");
    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
