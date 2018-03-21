'use strict';

require('./util/global-setup');
const Hapi = require('hapi');
const Mongoose = require('mongoose');
const SetupConfig = global.requireConfig('deployment/setup');
const Logger = global.requireUtil('logger');

//preparing server
const server = new Hapi.Server();
server.connection({
    port: SetupConfig.server.port,
    routes: { cors: true },
    labels: ['backend-api']
});

//connecting to db
const dbOptions = SetupConfig.db.options;
dbOptions.promiseLibrary = global.Promise;
Mongoose.connect(
    SetupConfig.db.uri,
    dbOptions
).then(() => {

    Logger.info('Connected with db successfully.');
}).catch((err) => {

    Logger.error(`Error while connecting with db: ${err}`);
});

//registering plugins
server.register(
    global.requireConfig('server/plugin-config'),
    {
        select: ['backend-api'],
        routes: {
            prefix: `/api/v${process.env.npm_package_version}`
        }
    })
    .then(() => {

        Logger.info('Plugins are successfully registered.');
    })
    .catch((err) => {

        Logger.error(`Error while registering plugings: ${err}`);
    });

module.exports = server;
