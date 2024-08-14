#---------------------------------
# BUILDER
#---------------------------------
FROM --platform=linux/amd64 node:18-slim AS builder

ENV APP_DIR=/app
##ENV SRC_DIR=.

WORKDIR ${APP_DIR}

#COPY ${SRC_DIR}/package* ./

RUN apt-get update -y && apt-get install -y curl

# RUN npm i --frozen-lockfile
# RUN npm cache clean --force


#---------------------------------
# FINAL
#---------------------------------
FROM builder AS final

ARG APP_NAME
ARG APP_PORT
ARG NODE_ENV

ENV APP_NAME=${APP_NAME}
###ENV APP_DIR=/app
ENV SRC_DIR=.
ENV DOCKER_DIR=./docker
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${APP_PORT}

###RUN apt-get update -y && apt-get install -y curl
###WORKDIR ${APP_DIR}

#COPY --from=BUILDER /app/node_modules ./node_modules
COPY ${SRC_DIR} .

RUN npm install
RUN npm run test
RUN npm run build

COPY ${DOCKER_DIR}/entrypoint.sh /usr/bin/entrypoint.sh

RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE ${PORT}

ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]