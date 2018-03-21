'use strict';

const Handlers = require('./handlers');
const Validators = require('./validators');
const UserScope = global.requireUtil('user-scope');

//export route objects for this plugin
module.exports = [
    {
        path: '/payment_dues',
        method: 'GET',
        config: {
            id: 'payment_dues_get',
            description: 'This api provides the list of users with dues. Access level: Admin',
            tags: ['api','payments'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.paymentdues_get,
            validate: Validators.paymentdues_get
        }
    },
    {
        path: '/users/{UserId}/payments',
        method: 'GET',
        config: {
            id: 'users_payments_get',
            description: 'This api provides payment history for the given user. Access level: Admin/Member',
            tags: ['api','payments'],
            auth: {
                scope: [`${UserScope.ADMIN}`, `${UserScope.MEMBER}`]
            },
            handler: Handlers.users_payments_get,
            validate: Validators.users_payments_get
        }
    },
    {
        path: '/users/{UserId}/payments',
        method: 'POST',
        config: {
            id: 'users_payments_post',
            description: 'This api allows to post new payment for given user. Access level: Admin',
            tags: ['api','payments'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.users_payments_post,
            validate: Validators.users_payments_post
        }
    },
    {
        path: '/financial_statistics',
        method: 'GET',
        config: {
            id: 'financial_statistics_get',
            description: 'This api provides overall financial statistics. Access level: Admin',
            tags: ['api','payments'],
            auth: {
                scope: [`${UserScope.ADMIN}`, `${UserScope.MEMBER}`]
            },
            handler: Handlers.financial_statistics_get,
            validate: Validators.financial_statistics_get
        }
    }
];
