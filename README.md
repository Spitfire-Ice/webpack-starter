Webpack

Commands:

    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "prod": "rimraf dist && webpack -p --config webpack.prod.js",
    "lint": "npm run lint:js && npm run lint:css",
    "server:prod": "http-server dist -o"
