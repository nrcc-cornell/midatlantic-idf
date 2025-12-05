# Mid-Atlantic IDF Curve Tool
In production [here](https://midatlantic-idf.rcc-acis.org/).

## Usage
Use node v16.20.2 (npm v8.19.4) to install and run in development. Make sure to use `--legacy-peer-deps` when install dependencies.


## Changes for this branch that need to be undone
  Uninstall "gh-pages"
  In package.json: 
  - Remove "homepage" 
  - "predeploy": "react-scripts build",
  - "deploy": "aws s3 sync --delete build/ s3://midatlantic-idf.rcc-acis.org/ --profile chesapeake"
  