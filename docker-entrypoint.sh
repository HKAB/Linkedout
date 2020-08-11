#/bin/bash
if [ -z ${NODE} ]; then
    NODE=backend-${HOSTNAME}
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
consul agent -config-dir /consul/config -node ${NODE} &
CONSUL_PID="$!"
sleep 20
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000 &
consul connect envoy -sidecar-for backend &
wait "${CONSUL_PID}"
