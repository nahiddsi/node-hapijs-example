'use strict';

const Server = require('./server');
const Logger = global.requireUtil('logger');

//starting the server
Server.start().then(() => {

    Logger.info(`Server running at: ${Server.info.uri}`);
    //starting cron-jobs
    require('./jobs/run');
}).catch((err) => {

    Logger.error(`Error while starting server: ${err}`);
});

