FROM consul:latest
FROM envoyproxy/envoy-alpine:v1.14.1
FROM nginx

COPY --from=0 /bin/consul /usr/local/bin/consul
COPY --from=1 /usr/local/bin/envoy /usr/local/bin/envoy

RUN apt update && \
    apt install -y prometheus-node-exporter

# COPY config/default.conf /etc/nginx/conf.d/default.conf

COPY ["./docker-entrypoint.sh", "/docker-entrypoint.sh"]
RUN ["chmod", "+x", "./docker-entrypoint.sh"]
