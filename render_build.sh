#!/usr/bin/env bash
# exit on error
set -o errexit

sleep 10

npm install
npm run build

pipenv install

pipenv run upgrade
