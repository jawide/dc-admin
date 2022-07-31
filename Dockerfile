FROM node:alpine as build
WORKDIR /build
COPY . /build

RUN yarn --ignore-engines install
RUN yarn run xbuild:prod

FROM nginx:alpine
COPY --from=build /build/templates /etc/nginx/templates
COPY --from=build /build/dist /usr/share/nginx/html
