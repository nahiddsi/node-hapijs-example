'use strict';

const Winston = require('winston');
const SetupConfig = global.requireConfig('deployment/setup');

const transports = [];
const loggerTypes = SetupConfig.logger.types || ['console'];

for (const type of loggerTypes) {
    transports.push(require('./config/transport-' + type));
}
module.exports = new (Winston.Logger)({ transports });

