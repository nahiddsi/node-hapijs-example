'use strict';

const Path = require('path');

const srcPath = Path.dirname(Path.resolve(process.env.npm_package_main));
const validateModuleName = function (modulename) {

    if (!modulename) {
        throw new Error('Need to provide valid module name');
    }
    modulename = (modulename.startsWith('.')) ? modulename.substr(1, modulename.length) : modulename;
    modulename = (!modulename.startsWith('/')) ? '/' + modulename : modulename;
    return modulename;
};

global.requireConfig = function (modulename) {

    return require(srcPath + '/config' + validateModuleName(modulename));
};

global.requirePlugin = function (modulename) {

    return require(srcPath + '/plugins' + validateModuleName(modulename));
};

global.requireUtil = function (modulename) {

    return require(srcPath + '/util' + validateModuleName(modulename));
};
