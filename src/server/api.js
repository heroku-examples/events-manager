'use strict';

require('dotenv').config();

const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST = path.join(__dirname, '..', '..', 'dist');
const INDEX = path.join(DIST, 'index.html');

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(DIST));

app.use('/api/members', require('./members'));
app.use('/api/events', require('./events'));

app.get('/', (req, res) => {
    res.sendFile(INDEX);
});

app.listen(PORT, () =>
    console.log(`✅  API Server started: http://${HOST}:${PORT}/`)
);
