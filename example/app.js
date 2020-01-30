const express = require('express');
const app = express();
const swaggerUi = require('../src/index')
const swaggerDoc = require('./petstore.json')

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
    // operationsSorter: function (a, b) {
    //     var score = {
    //         '/test': 1,
    //         '/bar': 2
    //     }
    //     console.log('a', a.get("path"), b.get("path"))
    //     return score[a.get("path")] < score[b.get("path")]
    // }
};

let swaggerUiOpts = {
    explorer: false,
    swaggerUrl: 'https://petstore.swagger.io/v2/swagger.json',
    swaggerOptions: options,
    customCss: '.swagger-ui .topbar { background-color: blue }'
}

const swaggerHtml = swaggerUi.generateHTML(swaggerDoc, swaggerUiOpts)

app.use('/api-docs-html', swaggerUi.serveFiles(swaggerDoc, swaggerUiOpts))
app.get('/api-docs-html', (req, res) => { res.send(swaggerHtml) });

module.exports = app;