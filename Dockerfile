# syntax=docker/dockerfile:1.0.0-experimental
# Stage 0, "build-stage" to build and compile the frontend
FROM node:14.15.0-alpine as build-stage

RUN apk update && \
  apk upgrade && \
  apk add git && \
  apk add openssh-client

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN --mount=type=ssh,id=github npm ci

COPY ./ /app/

ARG ISSUER_SERVER_URL
ARG VERIFIER_SERVER_URL
ARG ISSUER_DID
ARG ENV
ARG API_KEY
ENV REACT_APP_ISSUER_SERVER_URL=${ISSUER_SERVER_URL}
ENV REACT_APP_VERIFIER_SERVER_URL=${VERIFIER_SERVER_URL}
ENV REACT_APP_ISSUER_DID=${ISSUER_DID}
ENV REACT_APP_ENV=${ENV}
ENV REACT_APP_API_KEY=${API_KEY}

RUN SKIP_PREFLIGHT_CHECK=true npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
