'use strict';

const Code = require('code');
const SetupConfig = global.requireConfig('deployment/setup');

module.exports = function (token, server) {

    const req = {
        method: 'POST',
        url: `/api/v1.0.0/users/${SetupConfig.testData.NewUserId}/payments`,
        headers: {
            Authorization: token
        },
        payload: {
            PaymentAmount: 100,
            PaymentDate: '2017-06-21',
            SubmittedBy: 'admin',
            SubmitterNote: 'Test note'
        }
    };

    return server.inject(req).then((res) => {

        Code.expect(res.statusCode).to.equal(200);
    });
};
