# Swagger Ui for Loopback 4

> Referance: [Swagger Ui](https://github.com/swagger-api/swagger-ui)

## Install
```sh
npm i loopback4-swagger-ui-generator
```

## Import

```js
const swaggerUi = require('loopback4-swagger-ui-generator')
```

## How to use
> [Claudia api builder](https://github.com/claudiajs/claudia-api-builder)

```js
const swaggerUi = require('loopback4-swagger-ui-generator')

// path for swagger.json or swaager.yaml
const swaggerDocument = require('./swagger.json')

// deploy loopback4 swagger ui by claudia-api-builder
let ApiBuilder = require('claudia-api-builder')
let api = new ApiBuilder();

let options = {
  validatorUrl: null,
  oauth: {
    clientId: "your-client-id1",
    clientSecret: "your-client-secret-if-required1",
    realm: "your-realms1",
    appName: "your-app-name1",
    scopeSeparator: ",",
    additionalQueryStringParams: {}
  },
  // docExpansion: 'full',
  operationsSorter: function (a, b) {
    let score = {
      '/test': 1,
      '/bar': 2
    }
    console.log('a', a.get("path"), b.get("path"))
    return score[a.get("path")] < score[b.get("path")]
  }
};

let swaggerUiOpts = {
  explorer: false, // multiple select
  swaggerOptions: options,
  customCss: '.swagger-ui .topbar { background-color: pink }',
  swaggerUrl: '/swagger.json',
//   swaggerUrls: [{
//     url: url + "/latest/swaggerapi.json",
//     name: "Vehicle model"
//   }, {
//     url: "https://petstore.swagger.io/v2/swagger.json",
//     name: "Petstore"
//   }],
  // customJs: '/my-custom.js',
  operationsSorter: 'alpha',
  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
}

api.get('/apis-doc', (request) => {
  'use strict';
  let swaggerHtml = swaggerUi.generateHTML(swaggerDocument, swaggerUiOpts)
  return swaggerHtml
}, { success: { contentType: 'text/html' } });

module.exports = api;
```