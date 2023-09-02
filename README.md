# aff-toolbox

An Arcaea Chart Snippet Generator, based on Next.js and FastAPI.

Website: [AFF Toolbox](https://aff.arcaea.icu)

## Features

- Chart Offset Tool, Chart Mirror Tool, Chart Align Tool

- Arc Cutting Tool (by count or Timing), Arc Rain Generator, Crease Arc Generator, Frame Animation Utility

- Timing Easing Tool, Glitch Timing Generator

## Migration

The previous version of AFF Toolbox is based on MDUI and flask. You can still use it at [legacy AFF Toolbox](https://aff.arcaea.icu) for any purposes.

However, it is now archived and is no longer accepting new code, which means no new features will be added and there will be no bug fixes either.

## Development

### Requirements

#### Backend Requirements

- [Docker](https://www.docker.com/).
- [Docker Compose](https://docs.docker.com/compose/install/).
- [Poetry](https://python-poetry.org/) for Python package and environment management.

#### Frontend Requirements

- Node.js (with `yarn`).

### Full stack development

Before starting, you'll need a `.env` file to store environment variables. For example:

```env
DOMAIN=localhost

STACK_NAME=aff-toolbox

TRAEFIK_PUBLIC_NETWORK=traefik-public
TRAEFIK_TAG=aff.arcaea.icu
TRAEFIK_PUBLIC_TAG=traefik-public

DOCKER_IMAGE_BACKEND=dotdirewolf/aff-toolbox-backend
DOCKER_IMAGE_FRONTEND=dotdirewolf/aff-toolbox-frontend

# Backend
BACKEND_CORS_ORIGINS=["http://localhost", "http://localhost:3000", "http://localhost:8080", "https://localhost", "https://localhost:3000", "https://localhost:8080", "https://aff.arcaea.icu"]
PROJECT_NAME=aff-toolbox

```

Start the stack with Docker Compose.

```bash
docker compose up -d
```

Now you can open your browser and interact with these URLs:

- Frontend, built with Docker, with routes handled based on the path: http://localhost

- Backend, JSON based web API based on OpenAPI: http://localhost/api/

- Automatic interactive documentation with Swagger UI (from the OpenAPI backend): http://localhost/docs

Generally, `docker-compose.override.yml` will be loaded overriding `docker-compose.yml`, so, you can add "temporary" changes that help the development workflow.

### Backend development

By default, the dependencies are managed with [Poetry](https://python-poetry.org/), go there and install it.

From `./backend/app/` you can install all the dependencies with:

```console
poetry install
```

Then you can start a shell session with the new environment with:

```console
poetry shell
```

Then start the uvicorn service.

```console
uvicorn app.main:app --port 8080 --proxy-headers
```

### Frontend development

Enter the `frontend` directory, install the NPM packages and start the live server using the `npm` scripts:

```bash
cd frontend
yarn install
yarn run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000).

### Instruction: How to add a tool

#### 1. Declear a tool in `toolMetas` at `/frontend/config/modules.ts`

```javascript
{
    id: "toolID",
    category: "category", // find in /config/category.ts/category
    path: "/tool-id",
    endpoint: "/tool/id",
}
```

*(Optional)* Add `toolID` in `/frontend/config/category.ts/newModules` to make it available in "New" category.

#### 2. Implement frontend page in `/frontend/pages/tools/tool-id.tsx`

An arc tool example:

```tsx
// tool-id.tsx
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ArcField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { emptyStringToUndef } from "@/utils/helpers";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />
      {/* use ToolFormikForm and components in @/components to build a form */}
      <ToolFormikForm
        {/* 
        structure of form data:
        {
          arc: Arc,
          params: {
            num: int,
            optionalNum?: int
          }
        }
         */}
         {/* !! use existed param name as far as possible !! */}
        initValues={{ arc: "", params: { num: "", optionalNum: ""} }}
        {/* use Yup to validate data */}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            num: Yup.number().integer().required(),
            optionalNum: Yup.number()
              .integer()
              // best practice in Yup to validate an optional number
              .transform(emptyStringToUndef)
              .nullable(),
          }),
        }}
      >
        {/* Note section card, i18n will be processed inside */}
        <CardWithGrid title="Note区域"> 
          <ArcField name="arc" />
        </CardWithGrid>

        {/* Parameter card */}
        <CardWithGrid title="参数">
          <NumberField name="params.num" />
          {/* Optional params, i18n will be processed inside */}
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.optionalNum" />
        </CardWithGrid>
      </ToolFormikForm>
    </ToolStack>
  );
};

// i18n requirements
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh", ["common", "tools"])),
    },
  };
};

export default ToolPage;
```

By the way, you should add i18n strings too, because labels and hints of form components are is automatically defined according to tool ID.

Tool name and description are in the `/frontend/public/locales/{locale}/common.json`:

```json
{
  "tool.toolID.name": "Tool Name",
  "tool.toolID.shortDesc": "Tool Description",
}
```

Tool params related strings are in the `/frontend/public/locales/{locale}/tools.json`:

```json
{
  "input.params.paramID": "Param",
  "input.params.paramID.helper": "Param Helper",
}
```

#### 3. Implement note process logic

The frontend page receive an `ArcToolResult` as result:

```ts
export interface ArcToolResult {
  code: number;  // success = 0
  result: string;
}
```

There is two ways to implement note process logic.

##### a. implement at backend (recommend)

###### Declear Params model

```py
# /backend/app/app/model/request.py
class ToolIDParams():
    num: int,
    optionalNum: Optional[int] = 0
```

If your request model contains params like `count`, or `start` and `stop`, rather than delear them plainly, you should inherit classes like `CountCommonBody` or `StartStopCommonBody`, because these classes support more useful safety checks and you can just reuse them.

###### Declear API endpoint

```py
# /backend/app/app/router/aff/tool.py
@tool_router.post("/id")
async def tool_id(
    arc: a.Arc = Depends(arc_converter),  # use injection to parse notes
    params: ToolIDParams = Body(),
) -> CommonResponse[str]:
    return make_success_resp(
      #  result str
    )
```

##### b. implement at frontend

Due to there is not any aff processing dependency in frontend environment, this method should only be used in non-chart-reading conditions.

1. write a `(params) => ArcToolResult` function in `/frontend/utils/local/toolID.ts`

2. import the function in tool page.

3. set `processorOverride` attribute with your function to `<ToolFormikForm>`.

## Deployment

### Directly start the project with Docker Compose

- Create network for `traefik`.

```bash
sudo docker network create --scope=swarm --attachable traefik-public
```

This network is also suitbale for Docker Swarm.


- Build. You'll need to pass some environment variables manually.

```bash
TAG=prod FRONTEND_ENV=production sudo docker compose build
```

- Generate Docker stack yml.

```bash
sudo docker compose -f docker-compose.yml config > docker-stack.yml
```

- Start containers.

```bash
sudo docker compose -f docker-stack.yml up --no-build
```

- `traefik`'s 80 port will be bound to a random port.

### Use Docker Swarm

Before using Docker Swarm to deploy this project, you should make some changes to `docker-compose.yml`.

- Remove `services.proxy.ports`.
- Uncomment `- --providers.docker.swarmmode` in `services.proxy.command`.
- Move `services.(every service).labels` to `services.(every service).deploy.labels`.
