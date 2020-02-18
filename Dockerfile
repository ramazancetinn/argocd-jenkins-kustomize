FROM node:lts-alpine

MAINTAINER ramazancetinn@yandex.com

WORKDIR /usr/app

COPY src/package*.json ./

RUN npm install

COPY . .

EXPOSE 8005

WORKDIR /usr/app/src

CMD ["npm", "start"]