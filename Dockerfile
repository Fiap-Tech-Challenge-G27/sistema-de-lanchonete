FROM node:18-alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app

COPY . .

ENTRYPOINT ["bash", "-c", "npm install && npm run start:dev"]