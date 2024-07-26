"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _app_1 = __importDefault(require("./_app"));
const config_1 = __importDefault(require("./app/config/config"));
const _logger_1 = __importDefault(require("./logger/_logger"));
let server;
mongoose_1.default.connect(config_1.default.mongoose.url).then(() => {
    _logger_1.default.info('Connected to MongoDB');
    server = _app_1.default.listen(config_1.default.port, () => {
        _logger_1.default.info(`Listening to port ${config_1.default.port} ...`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            _logger_1.default.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    _logger_1.default.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    _logger_1.default.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
