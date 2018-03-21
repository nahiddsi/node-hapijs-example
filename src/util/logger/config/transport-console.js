'use strict';

const Formatter = require('./formatter');
const Winston = require('winston');
const SetupConfig = global.requireConfig('deployment/setup');

const logLevel = SetupConfig.logger.level || 'debug';

module.exports = new (Winston.transports.Console)({
    level: logLevel,
    timestamp: true,
    Formatter
});
