# Grafana

This repo was fork from [Grafana](https://github.com/grafana/grafana) v9.2.2

## Prerequisites

- node version: 18.0.0+
- yarn version: 3.2.3
- go version: 1.18.1

## Run locally

```
yarn install
make run
yarn start
```

## Image

Current images are pushed to AWS [ECR-public](https://console.aws.amazon.com/ecr/)
To build image:

```
docker build -t public.ecr.aws/tricorder/grafana .
docker tag public.ecr.aws/tricorder/grafana public.ecr.aws/tricorder/grafana:<tag>
docker push public.ecr.aws/tricorder/grafana:<tag>
# To run grafana with docker:
docker run -it --rm -p 3000:3000 --name=grafana public.ecr.aws/tricorder/grafana:<tag>
```
