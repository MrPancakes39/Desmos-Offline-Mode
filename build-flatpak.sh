#!/bin/env bash

# create flatapp folder
if [ -d flatapp ]; then
  rm -rf flatapp
fi
mkdir -p flatapp && \

# fetch files manually
mkdir -p flatapp/app && \
cp -r src-tauri/target/release/bundle/deb/desmos*/data flatapp/data && \
mv flatapp/data/usr flatapp/app/ ; \
mv flatapp/data/etc flatapp/app/ ; \
mv flatapp/data/opt flatapp/app/ ; \
rm -rf flatapp/data && \
chmod +x flatapp/app/usr/bin/desmos-offline-mode