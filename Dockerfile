FROM node:13.10.1-buster AS builder

WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

COPY . .

RUN npm install

RUN npx webpack --mode production

RUN npx postcss src/index.css > dist/bundle.css

FROM nginx:1.17.0-alpine as production

USER root

COPY --from=builder /code/dist /usr/share/nginx/html

RUN nginx

EXPOSE 80

LABEL maintainer="Engin Polat (polatengin) <engin@enginpolat.com>" \
      org.label-schema.docker.dockerfile="/Dockerfile" \
      org.label-schema.license="MIT" \
      org.label-schema.name="Display notification on a webpage using Typescript" \
      org.label-schema.vcs-type="Git" \
      org.label-schema.vcs-url="https://github.com/polatengin/moscow"
