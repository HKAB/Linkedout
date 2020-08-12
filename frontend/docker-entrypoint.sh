#!/bin/bash
if [ -z ${NODE} ]; then
    NODE=frontend-${HOSTNAME}
fi

echo "Meh running"

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
nginx -t && nginx
consul agent -config-dir /consul/config -node ${NODE} &
CONSUL_PID="$!"
sleep 5
consul connect envoy -sidecar-for frontend &
wait "${CONSUL_PID}"
