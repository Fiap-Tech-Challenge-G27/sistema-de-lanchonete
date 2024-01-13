FROM node:20-alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

RUN npm i -g npm@latest

USER node

WORKDIR /home/node/app

COPY . .