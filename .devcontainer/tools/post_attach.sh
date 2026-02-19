# sync devcontainer settings to machine settings json file
export NODE_PATH=$(npm root --quiet -g)
node ./.devcontainer/tools/update_devcontainer_settings.js

# do an npm install
cd frontend && npm i
cd ..