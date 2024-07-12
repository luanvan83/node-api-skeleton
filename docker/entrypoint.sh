#!/bin/bash
set -eu

APP_DIR="/app"

echo "[INFO] NODE_ENV: ${NODE_ENV}"

ls -la

#---------------------------------
# Verify NODE_ENV if doesn't exist
#---------------------------------
if ! [[ -n ${NODE_ENV} ]];
then
  echo "[ERROR] Can not get NODE_ENV."
  exit 1
fi

#---------------------------------
# Verify node_modules if doesn't exist
#---------------------------------
if [[ ${NODE_ENV} = "local" ]];
then

  cp -rp ./src/.env.${NODE_ENV} ./src/.env
  
  START_CMD="npm run dev"

  if ! [[ -d "${APP_DIR}/node_modules" ]];
  then
    npm install
  fi

elif [ ${NODE_ENV} = "production" ] || [ ${NODE_ENV} = "development" ];
then
  START_CMD="node index.js"

else
  echo "[ERROR] NODE_ENV: ${NODE_ENV} does not defined."
  exit 1

fi

#---------------------------------
# Run migration
#---------------------------------
npm run migrate

echo "[INFO] ${APP_NAME} is starting ........."
${START_CMD}