'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {

    description: function (schema, _description) {

        if (!schema) {
            throw Boom.badData('Invalid schema', schema);
        }
        if (_description) {
            return schema.description(_description);
        }
        return schema;
    },

    string : function (_description) {

        return this.description(Joi.string().trim(), _description);
    },
    string_optional : function (_description) {

        return this.string(_description).optional();
    },
    string_required : function (_description) {

        return this.string(_description).required();
    },

    boolean : function (_description) {

        return this.description(Joi.boolean(), _description);
    },
    boolean_optional : function (_description) {

        return this.boolean(_description).optional();
    },
    boolean_required : function (_description) {

        return this.boolean(_description).required();
    },

    number : function (_description) {

        return this.description(Joi.number(), _description);
    },
    number_optional : function (_description) {

        return this.number(_description).optional();
    },
    number_required : function (_description) {

        return this.number(_description).required();
    },

    date : function (_description) {

        return this.description(Joi.date(), _description);
    },
    date_optional : function (_description) {

        return this.date(_description).optional();
    },
    date_required : function (_description) {

        return this.date(_description).required();
    }
};


