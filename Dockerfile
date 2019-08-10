FROM node:8

MAINTAINER Pedro Lazari plazari96@gmail.com


RUN mkdir /var/www

WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE  3333
CMD [ "node", "./src/server.js" ]




