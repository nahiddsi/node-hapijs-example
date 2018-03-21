'use strict';

const Server = require('../src/server');
const Logger = global.requireUtil('logger');
const SetupConfig = global.requireConfig('deployment/setup');
const Lab = require('lab');
const { suite, before, after, test } = exports.lab = Lab.script();
let token;
const executeTestCase = function (name, path) {

    test(name, () => {

        return require(path)(token, Server);
    });
};

suite('Api test suite', () => {

    before(() => {

        const req = {
            method: 'POST',
            url: '/api/v1.0.0/user_sessions',
            payload: {
                Username: SetupConfig.testData.admin.username,
                Password: SetupConfig.testData.admin.password
            }
        };
        return Server.inject(req).then((response) => {

            token = response.result.token;
        });
        Logger.info('Start running the test cases.');
    });

    executeTestCase('/users - POST', './users/users-post');
    executeTestCase('/users - GET', './users/users-get');
    executeTestCase('/users/{UserId} - PATCH', './users/users-patch-by-id');
    executeTestCase('/users/{UserId} - GET', './users/users-get-by-id');
    executeTestCase('/users/{UserId}/payments - POST', './payments/payments-post');
    executeTestCase('/users/{UserId}/payments - GET', './payments/payments-get');
    executeTestCase('/payment_dues - GET', './payments/payments-dues-get');
    executeTestCase('/financial_statistics - GET', './payments/payments-dues-get');
    executeTestCase('/users/{UserId} - DELETE', './users/users-delete-by-id');

    after(() => {

        Logger.info('Stop running all the test cases.');
    });
});
