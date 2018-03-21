'use strict';

const Code = require('code');

module.exports = function (token, server) {

    const req = {
        method: 'GET',
        url: '/api/v1.0.0/financial_statistics',
        headers: {
            Authorization: token
        }
    };

    return server.inject(req).then((res) => {

        Code.expect(res.statusCode).to.equal(200);
    });
};
