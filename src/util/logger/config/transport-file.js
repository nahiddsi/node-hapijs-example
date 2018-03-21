'use strict';

const Formatter = require('./formatter');
const Winston = require('winston');
const SetupConfig = global.requireConfig('deployment/setup');
const Utility = global.requireUtil('utility');
const Path = require('path');

const logLevel = SetupConfig.logger.level || 'debug';

module.exports = new (Winston.transports.File)({
    level: logLevel,
    timestamp: true,
    filename: Path.join(Utility.getLogPath(),'backend-api.log'),
    json: false,
    Formatter
});
