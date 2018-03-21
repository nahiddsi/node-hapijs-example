'use strict';

const Const = global.requireUtil('constants');
const DEPOLOYMENT_ENV = process.env.DEPOLOYMENT_ENV || Const.ENV.DEVELOPMENT;

module.exports = function () {

    return require('./' + DEPOLOYMENT_ENV + '.json');
}();
