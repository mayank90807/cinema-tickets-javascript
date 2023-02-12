const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./pairtest/config/config');
const morgan = require('./pairtest/config/morgan');
const routes = require('./pairtest/routes');
const { errorConverter, errorHandler } = require('./pairtest/middlewares/error');
const InvalidPurchaseException = require('./pairtest/lib/InvalidPurchaseException');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new InvalidPurchaseException(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to InvalidPurchaseException, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
