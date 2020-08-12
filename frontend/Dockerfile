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
FROM nginx:latest
COPY --from=consul /bin/consul /usr/local/bin/consul
COPY --from=envoyproxy/envoy-alpine:v1.14.1 /usr/local/bin/envoy /usr/local/bin/envoy
COPY --from=build /app/build /usr/share/nginx/html
COPY ["./docker-entrypoint.sh", "/docker-entrypoint.sh"]
