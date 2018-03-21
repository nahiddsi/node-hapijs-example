'use strict';

const Code = require('code');
const SetupConfig = global.requireConfig('deployment/setup');

module.exports = function (token, server) {

    const req = {
        method: 'DELETE',
        url: `/api/v1.0.0/users/${SetupConfig.testData.NewUserId}`,
        headers: {
            Authorization: token
        }
    };

    return server.inject(req).then((res) => {

        Code.expect(res.statusCode).to.equal(200);
    });
};
