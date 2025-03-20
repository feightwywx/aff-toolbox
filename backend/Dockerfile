FROM python:3.11-alpine AS requirements-stage

WORKDIR /tmp

# Install build essentials
RUN apk add build-base libffi-dev

# Install Poetry
RUN pip install 'poetry==1.8.5'

COPY ./app/pyproject.toml ./app/poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.11-alpine

WORKDIR /app/

# Install openCV dependencies
RUN apk add --no-cache \
    libstdc++ \
    libgomp \
    libjpeg \
    libpng \
    tiff \
    openblas

# Install openCV build dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    g++ \
    make \
    musl-dev \
    linux-headers \
    jpeg-dev \
    zlib-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    tiff-dev \
    libffi-dev \
    openblas-dev

COPY --from=requirements-stage /tmp/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt && \
    apk del .build-deps

COPY ./app /app

ENV PYTHONPATH=/app

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
