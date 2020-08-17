FROM consul
FROM prom/prometheus

USER root
WORKDIR /consul/data
COPY --from=0 /bin/consul /usr/local/bin/consul
RUN chown -R root:root /etc/prometheus /prometheus

COPY ["docker-entrypoint.sh", "/"]
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]