'use strict';

const Code = require('code');
const UserScope = global.requireUtil('user-scope');
const SetupConfig = global.requireConfig('deployment/setup');

module.exports = function (token, server) {

    const req = {
        method: 'POST',
        url: '/api/v1.0.0/users',
        headers: {
            Authorization: token
        },
        payload: {
            Username: 'test-user',
            Password: '123456',
            FirstName: 'Test First Name',
            LastName: 'Test Last Name',
            Email: 'test@test.com',
            Scope: UserScope.ADMIN
        }
    };

    return server.inject(req).then((res) => {

        Code.expect(res.statusCode).to.equal(200);
        SetupConfig.testData.NewUserId = res.result._id;
    });
};
