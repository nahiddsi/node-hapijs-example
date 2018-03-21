'use strict';
const { goodWinston } = require('hapi-good-winston');

module.exports = [
    {
        register: require('good'),
        options: {
            reporters: {
                winston: [
                    goodWinston(global.requireUtil('logger'))
                ]
            }
        }
    },
    require('blipp'),
    require('inert'),
    require('vision'),
    {
        register: require('hapi-swagger'),
        options: global.requireConfig('deployment/setup').documentation
    },
    global.requirePlugin('auth-jwt'),
    global.requirePlugin('users'),
    global.requirePlugin('payments')
];
