FROM node:13.10.1-buster AS builder

WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

COPY . .

RUN npm install
