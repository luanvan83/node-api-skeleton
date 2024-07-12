#---------------------------------
# BUILDER
#---------------------------------
FROM --platform=amd64 node:18-slim AS BUILDER

ARG APP_NAME

ENV APP_DIR=/app
ENV SRC_DIR=.

WORKDIR ${APP_DIR}

COPY ${SRC_DIR}/package* ./

# RUN npm i --frozen-lockfile
# RUN npm i
RUN npm cache clean --force


#---------------------------------
# FINAL
#---------------------------------
FROM --platform=amd64 node:18-slim AS FINAL

ARG APP_NAME
ARG APP_PORT

ENV APP_NAME=${APP_NAME}
ENV APP_DIR=/app
ENV SRC_DIR=.
ENV DOCKER_DIR=./docker
ENV NODE_ENV=local
ENV PORT=${APP_PORT}

RUN apt-get update -y && apt-get install -y curl
WORKDIR ${APP_DIR}

#COPY --from=BUILDER /app/node_modules ./node_modules
COPY ${SRC_DIR} .
COPY ${DOCKER_DIR}/entrypoint.sh /usr/bin/entrypoint.sh

RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE ${PORT}

ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]