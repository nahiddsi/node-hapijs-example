'use strict';

module.exports.register = function (server, option, next) {

    server.route(require('./routes'));
    next();
};

module.exports.register.attributes = {
    pkg: require('./package.json'),
    once: true
};

module.exports.services = {
    PaymentService: require('./services/payment-service')
};
