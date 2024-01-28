FROM node:18-alpine

RUN npm i -g @nestjs/cli

USER node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start:dev"]