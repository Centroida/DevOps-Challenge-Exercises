/* globals __dirname */
const path = require('path');

const express = require('express');
const app = express();

const publicweb = process.env.PUBLICWEB || './dist/publicweb';

const init = (data) => {
    require('./app.config')(app, data);

    const api = require('./api.routes')(data);
    app.use('/api', api);

    app.get('*', (req, res) => {
        res.sendFile(`./index.html`);
    });

    return Promise.resolve(app);
};

module.exports = init;
