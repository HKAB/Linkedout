FROM node:latest as build

# Build environment
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install react-scripts -g
COPY . ./
RUN sed -i "s,http://localhost:8000,,g" /app/src/config/consts.js
RUN npm ci
RUN npm run build

# Run environment
FROM nginx

COPY --from=consul /bin/consul /usr/local/bin/consul
COPY --from=envoyproxy/envoy-alpine:v1.20.0 /usr/local/bin/envoy /usr/local/bin/envoy

RUN apt update && \
    apt install -y prometheus-node-exporter

COPY --from=build /app/build /usr/share/nginx/html
COPY ["./docker-entrypoint.sh", "/docker-entrypoint.sh"]
RUN ["chmod", "+x", "./docker-entrypoint.sh"]
