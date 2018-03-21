'use strict';

const Handlers = require('./handlers');
const Validators = require('./validators');
const UserScope = global.requireUtil('user-scope');

//export route objects for this plugin
module.exports = [
    {
        method: 'POST',
        path: '/user_sessions',
        config: {
            id: 'user_sessions_post',
            description: 'This api verifies the provided user credential and generates a temporary auth token.',
            tags: ['api','user_sessions'],
            auth: false,
            payload: {
                allow: ['application/json']
            },
            handler: Handlers.user_sessions_post,
            validate: Validators.user_sessions_post
        }
    },
    {
        path: '/users',
        method: 'GET',
        config: {
            id: 'users_get',
            description: 'This api provides the full user list. Access level: Admin',
            tags: ['api','users'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.users_get,
            validate: Validators.users_get
        }
    },
    {
        method: 'GET',
        path: '/users/{UserId}',
        config: {
            id: 'users_userid_get',
            description: 'This api provides user details for the given {user_id}. Access level: Admin/Member',
            tags: ['api','users'],
            auth: {
                scope: [`${UserScope.ADMIN}`,`${UserScope.MEMBER}`]
            },
            handler: Handlers.users_userid_get,
            validate: Validators.users_userid_get
        }
    },
    {
        path: '/users',
        method: 'POST',
        config: {
            id: 'users_post',
            description: 'This api allows to save a new user. Access level: Admin',
            tags: ['api','users'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.users_post,
            validate: Validators.users_post
        }
    },
    {
        method: 'PATCH',
        path: '/users/{UserId}',
        config: {
            id: 'users_userid_patch',
            description: 'This api allows update/patch on user details for the given {user_id}. Access level: Admin',
            tags: ['api','users'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.users_userid_patch,
            validate: Validators.users_userid_patch
        }
    },
    {
        method: 'DELETE',
        path: '/users/{UserId}',
        config: {
            id: 'users_userid_delete',
            description: 'This api deletes user details for the given {user_id}. Access level: Admin',
            tags: ['api','users'],
            auth: {
                scope: [`+${UserScope.ADMIN}`]
            },
            handler: Handlers.users_delete,
            validate: Validators.users_userid_get
        }
    }
];
