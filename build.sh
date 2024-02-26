#!/bin/bash

echo "Installing and building all folders"

rm -rf node_modules package-lock.json

# Default values for the packages
DEFAULT_JS_RUNTIME="https://sdk-team-cdn.decentraland.org/@dcl/js-sdk-toolchain/branch/psquad/test-framework-tool/@dcl/js-runtime/dcl-js-runtime-7.3.36-7291127796.commit-b299b0d.tgz"
DEFAULT_SDK="https://sdk-team-cdn.decentraland.org/@dcl/js-sdk-toolchain/branch/psquad/test-framework-tool/dcl-sdk-7.3.36-7291127796.commit-b299b0d.tgz"

# then the rest of the dependencies
npm install --legacy-peer-deps

if [ ! -z $SDK_VERSION ]; then
  echo "Installing $SDK_VERSION"
  npm i $SDK_VERSION
else
  echo "Installing $DEFAULT_SDK $DEFAULT_JS_RUNTIME"
  npm i $DEFAULT_SDK $DEFAULT_JS_RUNTIME
fi
npm ls @dcl/sdk

# clean the git state of package.json(s)
git add */package.json package.json

# and fail if git state is dirty
git diff --ignore-cr-at-eol --exit-code .

if [[ $? -eq 1 ]]; then
  echo "GIT IS ON DIRTY STATE 🔴 Please run 'npm run update-parcels' locally and commit"
  exit 1
fi

# and lastly build scenes
npm run build