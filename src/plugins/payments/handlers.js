'use strict';

const PaymentService = require('./services/payment-service');
const UserService = global.requirePlugin('users').services.UserService;
const Logger = global.requireUtil('logger');
const Boom = require('boom');

module.exports = {

    paymentdues_get: function (request, reply) {

        UserService.getUserListByDues(request.query)
            .then((users) => {

                Logger.info(`Fetched ${users.length} users`);
                return reply(users);
            })
            .catch((err) => {

                Logger.error(`Error while trying to fetch user list with dues: ${err}`);
                return reply(Boom.wrap(err));
            });
    },
    users_payments_get: function (request, reply) {

        PaymentService.getList(request.params.UserId, request.query)
            .then((paymentHistoryList) => {

                Logger.info(`Fetched ${paymentHistoryList.length} payment histories for given user`);
                return reply(paymentHistoryList);
            })
            .catch((err) => {

                Logger.error(`Error while trying fetch user payment history: ${err}`);
                return reply(Boom.wrap(err));
            });
    },
    users_payments_post: function (request, reply) {

        UserService.get(request.params.UserId)
            .then((user) => {

                Logger.info('payments:payment-service:payment_posts: got user by given id');
                PaymentService.post(user._id, request.payload)
                    .then((payment) => {

                        Logger.info('payments:payment-service:payment_posts: got user by given id');
                        return reply(payment);
                    })
                    .catch((err) => {

                        Logger.error(`payments:payment-service:payment_posts: Error while trying to post payment: ${err}`);
                        return reply(Boom.wrap(err));
                    });
            })
            .catch((err) => {

                Logger.error(`payments:payment-service:payment_posts: Error while trying to fetch user: ${err}`);
                return reply(Boom.badRequest('User not found for given id', { error: err }));
            });
    },
    financial_statistics_get: function (request, reply) {

        PaymentService.getStatistics(request.query)
            .then((statistics) => {

                Logger.info('payments:payment-service:financial_statistics_get: Successfully fetched the statistics');
                return reply(statistics);
            })
            .catch((err) => {

                Logger.error(`payments:payment-service:financial_statistics_get: Error while trying to fetch statistics: ${err}`);
                return reply(Boom.wrap(err));
            });
    }
};
