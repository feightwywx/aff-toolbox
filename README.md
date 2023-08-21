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

### Backend Requirements

- [Docker](https://www.docker.com/).
- [Docker Compose](https://docs.docker.com/compose/install/).
- [Poetry](https://python-poetry.org/) for Python package and environment management.

### Frontend Requirements

- Node.js (with `yarn`).

### Local development

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

## Frontend development

Enter the `frontend` directory, install the NPM packages and start the live server using the `npm` scripts:

```bash
cd frontend
yarn install
yarn run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000).

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
