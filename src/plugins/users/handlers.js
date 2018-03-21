'use strict';

const UserService = require('./services/user-service');
const Logger = global.requireUtil('logger');
const Bcrypt = require('bcrypt');
const Config = require('./config/encryption');
const JWT = require('jsonwebtoken');
const Auth = global.requirePlugin('auth-jwt');
const SetupConfig = global.requireConfig('deployment/setup');
const Boom = require('boom');

module.exports = {
    user_sessions_post: function (request, reply) {

        const { Username, Password } = request.payload;
        UserService.getByUsername(Username)
            .then((user) => {

                Bcrypt.compare(Password, user.Password)
                    .then((matched) => {

                        if (!matched) {

                            Logger.error('Given password did not match');
                            return reply(Boom.unauthorized('Password did not match!!'));
                        }
                        const secretKey = process.env.JWT_SECRET || Auth.AuthConst.JWT.SECRET_KEY;
                        const options = {
                            _id: user._id,
                            Username: user.Username,
                            FirstName: user.FirstName,
                            LastName: user.LastName,
                            scope: user.Scope
                        };
                        return reply({ token: JWT.sign(options, secretKey, { expiresIn: SetupConfig.server.authTokenExpirationTime }) });
                    })
                    .catch((err) => {

                        Logger.error(`Error while trying to compare the password for authentication : ${err}`);
                        return reply(Boom.wrap(err));
                    });
            })
            .catch((err) => {

                Logger.error(`Error while trying to look for user by given username: ${err}`);
                return reply(Boom.unauthorized('Username did not match!!'));
            });
    },
    users_get: function (request, reply) {

        UserService.getList(request.query)
            .then((users) => {

                Logger.info(`user:handlers: Returned ${users.length} users`);
                return reply(users);
            })
            .catch((err) => {

                Logger.error(`user:handlers: error while fetching userlist ${err}`);
                return reply(Boom.wrap(err));
            });
    },
    users_userid_get: function (request, reply) {

        UserService.get(request.params.UserId)
            .then((user) => {

                Logger.info(`user:handlers: Returned user info`);
                return reply(user);
            })
            .catch((err) => {

                Logger.error(`user:handlers: error while fetching userinfo ${err}`);
                return reply(Boom.badRequest(err.message, { error: err }));
            });
    },
    users_post: function (request, reply) {

        Bcrypt.hash(request.payload.Password, Config.saltRounds)
            .then((hash) => {

                request.payload.Password = hash;
                UserService.post(request.payload)
                    .then((user) => {

                        Logger.info(`user:handlers: Created new user info`);
                        return reply(user);
                    })
                    .catch((err) => {

                        Logger.error(`user:handlers: error while fetching userinfo ${err}`);
                        return reply(Boom.wrap(err));
                    });
            })
            .catch((err) => {

                Logger.error(`user:handlers: error while encrypting password: ${err}`);
                return reply(Boom.wrap(err));
            });
    },
    users_userid_patch: function (request, reply) {

        UserService.patch(request.params.UserId, request.payload)
            .then((user) => {

                Logger.info(`user:handlers: Updated user info`);
                return reply(user);
            })
            .catch((err) => {

                Logger.error(`user:handlers: error while updating userinfo ${err}`);
                return reply(Boom.wrap(err));
            });
    },
    users_delete: function (request, reply) {

        UserService.delete(request.params.UserId)
            .then(() => {

                Logger.info('user:handlers: Successfully deleted user');
                return reply(200);
            })
            .catch((err) => {

                Logger.error(`user:handlers: error while deleting user ${err}`);
                return reply(Boom.badRequest(err.message, { error: err }));
            });
    }
};
