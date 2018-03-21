'use strict';

module.exports = [
    require('blipp'),
    require('inert'),
    require('vision'),
    {
        register: require('hapi-swagger'),
        options: {
            info: {
                title: 'Api Documentation',
                version: process.env.npm_package_version
            },
            swaggerUI: false,
            documentationPage: true,
            connectionLabel: 'backend-api',
            grouping: 'tags'
        }
    }
];
