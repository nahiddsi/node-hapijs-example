'use strict';

const Formatter = require('./formatter');
const Winston = require('winston');
const SetupConfig = global.requireConfig('deployment/setup');

const logLevel = SetupConfig.logger.level || 'debug';

require('winston-daily-rotate-file');
module.exports =  new (Winston.transports.DailyRotateFile)({
    level: logLevel,
    filename: 'backend-api.log',
    datePattern: 'logs/yyyy-MM-dd-',
    prepend: true,
    timestamp: true,
    json: false,
    maxDays: 10,
    maxFiles: 8,
    maxsize: 10485760,
    Formatter
});

