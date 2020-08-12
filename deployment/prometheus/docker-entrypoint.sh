#!/bin/sh
if [ -z ${NODE} ]; then
    NODE=prometheus-${HOSTNAME}
fi

# setting up SIGTERM handler for consul agent
CONSUL_PID=0
term_handler () {
    if [ ${CONSUL_PID} -ne 0 ]; then
        kill "${CONSUL_PID}"
        wait "${CONSUL_PID}"
    fi
    exit 143;
}
trap term_handler TERM

# app
/usr/local/bin/consul agent -config-dir /consul/config -node ${NODE} &
CONSUL_PID="$!"
sleep 5
/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus --web.console.libraries=/usr/share/prometheus/console_libraries --web.console.templates=/usr/share/prometheus/consoles
wait "${CONSUL_PID}"
