const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {base_url, movies} = require('./config');

const indexRouter = require('./routes');
const actorsRouter = require('./routes/actors');
const charactersRouter = require('./routes/characters');
const {__init} = require('./repositories/movie-repository');

const index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());

index.use(`${base_url}/`, indexRouter);
index.use(`${base_url}/actors`, actorsRouter);
index.use(`${base_url}/characters`, charactersRouter);

module.exports = require('./repositories/data-loader')(movies)
    .then(data => __init(data))
    .then(() => index);
