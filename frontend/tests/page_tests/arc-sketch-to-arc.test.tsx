import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolPage from "@/pages/tools/arc-sketch-to-arc";
import { arcPostProcessFields } from "../utils/commonFields";

const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      onerror: jest.fn(),
      result: 'data:image/png;base64,mocked_base64_data'
    };
// @ts-expect-error
global.FileReader = jest.fn(() => mockFileReader);

const formFields = [
  {
    id: "image",
    type: "dataid",
    name: "input.params.image"
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
    id: "method",
    type: "button",
    name: "input.params.method"
  },
  {
    id: "plane",
    type: "button",
    name: "input.params.plane"
  },
  {
    id: "sampling_rate",
    type: "textbox",
    name: "input.params.sampling_rate"
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
  {
    id: "x_scale",
    type: "textbox",
    name: "input.params.x_scale"
  },
  {
    id: "y_scale",
    type: "textbox",
    name: "input.params.y_scale"
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

  let file: File;
  const pngHeader = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  beforeEach(() => {
    const { unmount } = render(<ToolPage />);
    u = unmount;

    for (const meta of formFields) {
      if (meta.type !== 'dataid') {
        formControl[meta.id] = screen.getByRole(meta.type, { name: meta.name });
      } else {
        formControl[meta.id] = screen.getByTestId(meta.name);
      }
    }

    formSubmit = screen.getAllByRole("button", { name: "submit" })[0];
    formResult = screen.getAllByTestId("result")[0];

    file = new File([pngHeader], "test.png", { type: "image/png" });
  });

  afterEach(() => {
    u(); // unmount
  });

  it("required", async () => {
    // FIXME user.upload上传文件后formResult错误，疑似没有通过表单校验
    await user.upload(formControl.image, file);
    await user.type(formControl.start, "0");
    await user.type(formControl.stop, "0");

    await user.click(formSubmit);

    expect(formResult.innerHTML).toMatchSnapshot();
  }, 30000);
});
