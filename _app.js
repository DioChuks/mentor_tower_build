"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const passport_1 = __importDefault(require("passport"));
require("dotenv/config");
const _auth_routes_1 = __importDefault(require("./routes/_auth.routes"));
const community_routes_1 = __importDefault(require("./routes/community.routes"));
const config_1 = __importDefault(require("./app/config/config"));
const _morgan_1 = __importDefault(require("./logger/_morgan"));
const passport_2 = __importDefault(require("./app/middleware/passport"));
const _rateLimiter_1 = __importDefault(require("./app/utils/_rateLimiter"));
const _error_1 = require("./errors/_error");
const _ApiError_1 = __importDefault(require("./errors/_ApiError"));
// import methodNotAllowed from "./middleware/methodNotAllowed";
// import allowedMethods from "./config/allowedMethod";
const http_status_codes_1 = require("http-status-codes");
const env = process.env.NODE_ENV;
let url;
if (env == "production") {
    url = "https://api.mentortower.ng";
}
else {
    url = "http://localhost:8000";
}
const app = (0, express_1.default)();
if (config_1.default.env !== 'test') {
    app.use(_morgan_1.default.successHandler);
    app.use(_morgan_1.default.errorHandler);
}
const whitelist = [
    "http://localhost:3003",
    "http://localhost:8000",
];
const corsOption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, helmet_1.default)());
app.use(cors(corsOption));
app.options('*', cors(corsOption));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
passport_1.default.use('jwt', passport_2.default);
if (config_1.default.env === 'production') {
    app.use('/v1', _rateLimiter_1.default);
}
app.use('/v1', _auth_routes_1.default);
app.use('/v1/comms', community_routes_1.default);
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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new _ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(_error_1.errorConverter);
// handle error
app.use(_error_1.errorHandler);
exports.default = app;
