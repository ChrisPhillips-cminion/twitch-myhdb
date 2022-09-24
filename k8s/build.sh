podman build -t nexus.phillips11.cf:8084/cminion.cf/other/myhdb:latest .
podman  push nexus.phillips11.cf:8084/cminion.cf/other/myhdb:latest

oc project other
pwd
oc apply -f k8s/deploy.yaml
oc apply -f k8s/service.yaml
oc apply -f k8s/route.yaml

oc rollout restart sts/myhdb
