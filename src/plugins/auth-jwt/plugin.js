'use strict';
const AuthConst = require('./auth-constants');

module.exports.register = (server, options, next) => {

    server.register(require('hapi-auth-jwt2'), (err) => {

        if (err) {
            return next(err);
        }

        server.auth.strategy('jwt', 'jwt', true, {
            key: process.env.JWT_SECRET || AuthConst.JWT.SECRET_KEY,
            validateFunc: function (decoded, request, callback) {
                /*if (!decoded.scope)
                    return callback(null, false);*/
                //put your validation logic here
                return callback(null, true, decoded);
            },
            verifyOptions: {
                algorithms: [AuthConst.ALGORITHMS]
            }
        });

        return next();
    });
};

module.exports.register.attributes = {
    pkg: require('./package.json'),
    once: true
};

module.exports.AuthConst = AuthConst;
