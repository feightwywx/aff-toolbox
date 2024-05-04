import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { echoServer } from "../mock";
import ToolPage from "@/pages/tools/sc-blink";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux");

beforeAll(() => echoServer.listen());
afterEach(() => echoServer.resetHandlers());
afterAll(() => echoServer.close());

test("echo test", async () => {
  const user = userEvent.setup();
  // @ts-ignore
  // delete window.location;
  // @ts-ignore
  // window.location = new URL("https://www.example.com/tools/sc-blink");
  render(<ToolPage />);
  await user.type(
    screen.getByRole("textbox", { name: "input.params.start" }),
    "1"
  );
  expect(
    (
      screen.getByRole("textbox", {
        name: "input.params.start",
      }) as HTMLInputElement
    ).value
  ).toBe("1");
});
