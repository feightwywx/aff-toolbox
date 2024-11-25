import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { ArcToolResult } from "../utils/interfaces";

export const echoServer = setupServer(
  http.get("/api/:toolID", async ({ params, request }) => {
    const { toolID } = params;
    const data = await request.json();

    const result: ArcToolResult = {
      code: 0,
      result: JSON.stringify(data),
    };

    return HttpResponse.json(JSON.stringify(result));
  })
);
