# 仓库协作指南

本文件适用于整个 aff-toolbox 仓库。默认使用中文沟通并编写新增说明；保留已有 API 名称、AFF 关键字、工具 ID 和国际化键名。先查看相关源码和测试，再修改实现。

## 项目定位与结构

aff-toolbox 是 Arcaea 谱面处理与片段生成工具。前端负责表单、参数校验、结果复制和历史记录；后端负责 AFF 解析、谱面变换、生成算法和图像转黑线。

- 前端：Next.js 13.4.4、React 18、TypeScript，使用 Pages Router；界面使用 MUI 5，表单使用 Formik/Yup，状态使用 Redux Toolkit，国际化使用 next-i18next。
- 后端：Python 3.11 开发环境、FastAPI、Pydantic 1、arcfutil，以及 OpenCV contrib headless 和 NumPy。依赖由 Poetry 管理。
- 集成：Docker Compose 与 Traefik；前后端均有 GitHub Actions 测试流程。

| 路径 | 职责 |
| --- | --- |
| `frontend/pages/tools/` | 各工具页面 |
| `frontend/config/modules.ts` | 工具 ID、分类、页面路径与 API endpoint 的映射 |
| `frontend/config/category.ts` | 分类和新工具展示配置 |
| `frontend/components/ToolFormikForm.tsx` | 统一提交、参数预处理、错误提示、复制和历史记录 |
| `frontend/components/input/` | 可复用表单字段 |
| `frontend/utils/interfaces.ts` | 前端请求结果等类型及状态码 |
| `frontend/utils/slices/layout.ts` | 布局与结果历史状态 |
| `frontend/public/locales/{zh,en}/` | 中文与英文翻译 |
| `frontend/tests/page_tests/` | 工具页面测试和快照 |
| `backend/app/app/main.py` | FastAPI 应用、CORS、异常处理和路由注册 |
| `backend/app/app/router/aff/` | arc、timing、chart、parser、etc 路由 |
| `backend/app/app/model/` | 请求模型、校验器和响应约定 |
| `backend/app/app/utils/chart.py` | 图像转 Arc、物件转黑线和辅助几何算法 |
| `backend/app/app/utils/postprocess.py` | Arc 镜像、间隔筛选和拉直后处理 |
| `backend/app/app/tests/` | pytest API 测试 |
| `backend/app/pyproject.toml`、`backend/app/poetry.lock` | 后端依赖声明与锁定版本 |
| `frontend/package.json`、`frontend/yarn.lock` | 前端命令、依赖和锁文件 |
| `docker-compose.yml`、`docker-compose.override.yml` | 服务、反向代理和开发覆盖配置 |

`README.md` 描述本项目；`README.boilerplate.md` 和部分根目录脚本来自模板，不应据此假定存在用户系统、数据库或未实现的运维功能。

## Arcaea 资料与 arcfutil 依赖

涉及 AFF 格式、TimingGroup、Arc/Arctap 或判定机制时，使用 `arcaea-references` skill，先阅读其 `SKILL.md`，再按需查阅 `references/谱面格式.md`、`references/物量与判定机制.md` 或 `references/机制.md`。

后端声明 `arcfutil = ^0.12.3`，当前 `poetry.lock` 锁定为 `0.12.3`。旁边的 `../arcfutil` 是独立仓库，不会自动作为本项目依赖，也不能用其当前源码替代已安装版本的行为证据。修改依赖相关逻辑时先确认实际加载路径、版本和接口；升级依赖时同步声明、锁文件并运行相关回归测试。

谱面处理需特别关注：

- 区分完整 AFF 与谱面片段。`notes_converter()` 以输入是否从 `AudioOffset` 开头决定保留 `AffList` 还是转换成 `NoteGroup`；处理空白、头部、密度参数时检查这条分支。
- arcfutil 的 `load(text)` 读取字符串、`loads(path)` 读取文件，`dump()` 返回排序后的字符串，`str()` 则按容器现有顺序输出。不要混用接口或假定所有路由都会自动排序。
- 保留 TimingGroup 边界、option、组内 Timing 和 Arctap。组内 Timing 不应被误当成主时间组的全局 Timing。
- 偏移接口依赖 arcfutil 的 `offsetto()`，并自行处理 AudioOffset、负时间物件和片段输出；片段分支会移除首项。调整该逻辑时验证补入零时刻 Timing 与列表位置的关系。
- 缩放接口递归处理组内物件，同时缩放 BPM、起止时间和 Arctap，并特殊处理零时刻 Timing 及非零长度物件。使用非负时间、参考点、零长度 Arc 和多个时间组验证边界；测试中的每个 TimingGroup 应包含 `time=0` 的初始 Timing。
- 镜像、对齐、黑线转换和后处理可能原地修改物件。留意共享对象、处理顺序及附属字段，不能只检查输出能否解析。
- 图像转换实际位于本仓库，使用 `cv2.ximgproc.thinning` 等 contrib 功能。不要随意换成不含 contrib 的 OpenCV 包；修改时检查 data URI、解码失败、轮廓采样和两种投影平面。

## API 与前端约定

浏览器发送 `POST /api/aff${endpoint}`。Traefik 去掉 `/api` 后转发，FastAPI 实际路径为 `/aff/...`；后端 TestClient 也直接使用 `/aff/...`。`next.config.js` 当前没有 API rewrite，因此只分别启动 Next.js 和 Uvicorn 并不会自动接通 `/api`，联调时须确认代理配置。

响应结构为 `{ code, result }`，成功码为 `0`。统一使用 `make_success_resp()`、`make_fail_resp()`；修改状态码时同步前端枚举和提示逻辑。当前多个异常处理器返回 HTTP 200 和非零业务码，不能仅依靠 HTTP 状态判断成功，也不要在无配套前端改动时重写错误协议。

请求模型基于 Pydantic 1 的 `validator`、`root_validator` 和 `parse_obj`。沿用现有校验方式；迁移到 Pydantic 2 属于单独任务。优先复用起止时间、数量等公共模型，同时检查现有校验是否覆盖任务所需边界，例如 `CountCommonBody` 当前只限制数量上限。

新增或修改工具时，联动检查以下内容：

1. 在 `frontend/config/modules.ts` 注册工具；`path` 为 `/tool-name`，对应页面实际位于 `/tools/tool-name`，`endpoint` 不重复包含 `/api/aff`。
2. 在 `pages/tools/` 建立页面，复用 `ToolStack`、`ToolTitle`、`ToolFormikForm` 和已有字段组件；保持字段名与后端请求模型一致。
3. 定义 Formik 初值与 Yup 校验。可选数字参考 `emptyStringToUndef`；名称含 `b_point`、`breakpoint`、`limit_range` 的参数会被公共表单从逗号字符串转为数字数组，改名或改类型时同步预处理逻辑。
4. 在后端定义请求模型，通过已有转换依赖解析物件，在对应 router 下实现接口；新增路由模块时注册到 `router/aff/__init__.py`。
5. 更新中文和英文翻译。工具名称、描述使用 `common.json` 的 `tool.<id>.*`，字段及帮助使用 `tools.json` 的 `input.*`；保留页面的 `serverSideTranslations` 配置。
6. 按需接入 Arc 后处理和新工具分类，补充对应 API 测试及前端表单测试。

前端使用 `@/` 路径别名、TypeScript strict 模式和已有 Redux 类型化 hooks。不要为局部功能改用 App Router、另一套组件库或新建并行表单框架。谱面解析优先复用后端；`processorOverride` 是公共表单已有的可选本地处理入口。

## 开发流程

开始功能或修复前，先确保现有工作区没有需要保留但尚未提交的修改，再同步主分支并建立独立分支：

```powershell
git switch main
git pull --ff-only origin main
git switch -c codex/<简短主题>
```

不要直接在 `main` 上开发。完成后先运行与改动直接相关的测试，再运行受影响端的完整测试；检查差异后使用 Conventional Commits 提交，例如：

```powershell
git diff --check
git status --short
git add <本次修改的明确文件列表>
git commit -m "feat(chart-scale): add timing conflict repair"
git push -u origin codex/<简短主题>
```

使用 `feat`、`fix`、`test`、`docs`、`refactor`、`build` 等合适类型，并用括号标明清晰的功能范围。提交前只暂存本次任务的文件，不使用会混入其他改动的宽泛暂存命令。合并 PR 后切回 `main`，再次使用 `git pull --ff-only origin main` 获取合并结果。

## 本地开发环境

后端命令在 `backend/app` 目录执行，使用 Python 3.11 和 Poetry。锁文件格式由当前 Poetry 2 正常读取；Dockerfile 目前仍安装 Poetry 1.8.5，构建时可能显示锁文件兼容性警告，但现有依赖可以导出：

```powershell
poetry env use <Python 3.11 解释器路径>
poetry install --with dev
poetry run uvicorn app.main:app --port 8080 --proxy-headers --reload
poetry run pytest
poetry run pytest app/tests/test_chart.py
```

如需把虚拟环境放在项目内，可在创建环境前设置 `POETRY_VIRTUALENVS_IN_PROJECT=true`。项目内 `.venv`、`.pytest_cache`、`__pycache__` 和其他缓存不得提交；后端镜像构建前也应确保它们不会进入 Docker 构建上下文。当前 `backend/` 没有 `.dockerignore`，本机存在 `backend/app/.venv` 时会明显增大构建上下文，相关构建维护任务应补充排除规则。

前端命令在 `frontend` 目录执行。CI 使用 Node.js 20；`packageManager` 指定 Yarn 4.2.2，`.yarnrc.yml` 使用 node-modules linker：

```powershell
corepack enable
yarn install --immutable
yarn dev
yarn test --runInBand tests/page_tests/chart-scale.test.tsx
yarn test --runInBand --silent
yarn lint
yarn build
```

不要生成 npm 锁文件或随意重写 Yarn/Poetry 锁文件。纯文档修改通常只需检查内容与差异，无须安装运行依赖。

## 测试约定

- 后端接口测试沿用现有模式：使用 FastAPI `TestClient` 请求真实 `/aff/...` 路径，同时断言 HTTP 状态和完整 `{code, result}` 响应。不要绕开路由直接调用处理函数来代替接口测试。
- AFF 测试输入应符合实际数据：事件 `time >= 0`，每个 TimingGroup 包含一条 `time=0` 的初始 Timing。通过正数 `standard` 表达位于处理基准之前的事件，不用负时间构造这种场景。
- 涉及主时间组和 TimingGroup 的算法必须验证各层独立处理，保留 group option，并覆盖默认可选参数、显式启用和显式关闭。
- 前端页面测试使用 Jest、jsdom 和 Testing Library。字段变化应验证默认值和用户操作后的提交值；更新快照前先查看失败差异，只更新确认符合请求结构的快照。
- `data-testid="result"` 显示的是序列化请求值，不是后端生成的 AFF。前端快照通过不能替代后端算法测试。
- 全量前端测试耗时较长，先运行对应页面测试快速反馈，再运行完整套件。现有测试会输出 react-i18next、notistack 警告；只要测试通过，这些已知警告不代表本次功能失败。

## 镜像构建与 Compose 联调

从仓库根目录构建前后端本地镜像。前端版本参数会进入公开构建信息，应使用清楚的开发标识：

```powershell
docker build -t aff-toolbox-backend:local ./backend
$commit = git rev-parse --short HEAD
docker build -t aff-toolbox-frontend:local `
  --build-arg ATB_VERSION=dev `
  --build-arg ATB_VERSION_COMMIT="$commit-dirty" `
  --build-arg ATB_TARGET=web `
  ./frontend
```

本机测试配置位于 `~/aff-toolbox-beta-stack.yml`。该文件引用远程镜像，且其中的 Linux `build.context` 不适用于 Windows 本地仓库；测试本地镜像时创建临时 Compose override，只覆盖镜像：

```yaml
services:
  backend:
    image: aff-toolbox-backend:local
  frontend:
    image: aff-toolbox-frontend:local
  proxy:
    image: traefik:v2
```

当前 Docker Desktop 29 与固定的 `traefik:v2.10` 无法正常连接 Docker provider，会导致页面和 API 返回 404；`traefik:v2` 当前解析到可用的 2.11 系列。确保外部网络 `traefik-public` 已存在，然后使用原配置和临时 override 启动，避免 Compose 尝试使用错误的本地 build context：

```powershell
$stack = Join-Path $HOME 'aff-toolbox-beta-stack.yml'
$override = '<临时 override 文件路径>'
docker compose -f $stack -f $override up -d --no-build --force-recreate
docker compose -f $stack -f $override ps
docker compose -f $stack -f $override logs --tail 50 backend frontend proxy
```

联调至少检查：

- `http://localhost:6161/` 或目标工具页返回 200。
- `http://localhost:6161/api/` 返回成功业务响应。
- 使用本次功能对应的真实 API 请求检查生成结果，不能只确认容器为 `Up`。
- `docker compose ps` 显示的前后端镜像确实是刚构建的本地标签。

停止或重建时始终带上同一个 override 文件，以免 Compose 恢复远程镜像或旧 Traefik 配置。不要把临时 override、`.env`、凭据或本地镜像信息提交到仓库。

## 验证与交付

- 后端现有测试使用 FastAPI TestClient，不需要运行外部服务器。修改算法时验证输出内容、时间和坐标边界、时间组保留情况；修改接口时同时检查业务码和错误输入。
- 前端使用 Jest、jsdom 和 Testing Library，已有页面测试主要验证表单交互及提交数据快照。`data-testid="result"` 显示的是序列化请求值，不是后端生成的 AFF，前端快照通过不能替代后端算法验证。
- 更新快照前检查变化是否符合预期，不用批量更新快照掩盖请求结构或默认值的回归。共享表单、模型或依赖变更应扩大到受影响的测试；局部改动先运行对应测试文件。
- 后端 CI 执行 `poetry run pytest`；前端 CI 执行 `yarn run test --silent`。lint、构建和类型检查按改动风险补充，不声称 CI 已覆盖所有检查。
- 根目录 `scripts/test.sh`、`scripts/test-local.sh` 含 `down -v`，还引用当前仓库不存在的 `/app/tests-start.sh`。不要将其当作默认测试入口；优先使用上述直接测试命令。部署和镜像推送脚本也不属于普通验证步骤。
- 结束前检查 `git diff --check` 与 `git status --short`，保留用户已有改动。交付说明包含修改内容、实际执行的验证及剩余限制；未运行的测试要明确说明。
