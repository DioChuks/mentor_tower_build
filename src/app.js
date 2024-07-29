const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();
const router = require('./routes/auths');
const commPostRouter = require('./routes/community');
const config = require('./config/appConfig');
const morgan = require('./log/morgan');
const jwtStrategy = require('./middlewares/passport');
const authLimiter = require('./utils/rateLimiter');
const { errorConverter, errorHandler } = require('./errors/error');
const ApiError = require('./errors/ApiError');
const { StatusCodes } = require('http-status-codes');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const env = process.env.NODE_ENV;
let url;
if (env == "production") {
  url = "https://api.mentortower.ng";
}
else {
  url = "http://localhost:8000";
}

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

const whitelist = [
  "http://localhost:3003",
  "http://localhost:8000",
];
const corsOption = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(helmet());
app.use(cors(corsOption))
app.options('*', cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
if (config.env === 'production') {
  app.use('/v1', authLimiter);
}
app.use('/v1', router);
app.use('/v1/comms', commPostRouter);

const swaggerDefinition = {
    openapi: "3.1.0",
    info: {
      title: "Mentor Tower APIs",
      version: "0.1.0",
      description: "API documentation for mentor tower app",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Invictus Backend",
        url: "https://github.com/DioChuks",
        email: "diochuks65@gmail.com",
      },
    },
    servers: [
        {
          url: url,
          description: 'Development Server',
        },
      ],
};

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['packages/components.yaml', 'dist/routes/*.js'],
});
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


module.exports = app
