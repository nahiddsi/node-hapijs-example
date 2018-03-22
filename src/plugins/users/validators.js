'use strict';

const Joi = require('joi');
const JoiSchema = global.requireUtil('joi-schema');

module.exports = {
    user_sessions_post: {
        query: false,
        payload: {
            Username: JoiSchema.string_required().min(1).max(32),
            Password: JoiSchema.string_required().min(6).max(32)
        }
    },
    users_get: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        params: false,
        query: {
            Username: JoiSchema.string_optional('User name'),
            FirstName: JoiSchema.string_optional('User first name'),
            LastName: JoiSchema.string_optional('User last name'),
            Email: JoiSchema.string_optional('User email address'),
            Phone: JoiSchema.string_optional('Phone'),
            IsActive: JoiSchema.boolean_optional('Is user active ?')
        }
    },
    users_userid_get: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        params: {
            UserId: JoiSchema.string_required('User ID')
        },
        query: false
    },
    users_post: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        query: false,
        payload: {
            Username: JoiSchema.string_required('User name').min(1).max(32),
            Password: JoiSchema.string_required('Password').min(6).max(32),
            FirstName: JoiSchema.string_required('First name'),
            LastName: JoiSchema.string_required('Last name'),
            IsActive: JoiSchema.boolean_optional('Is Active'),
            Email: JoiSchema.string_optional('Email address').email(),
            Phone: JoiSchema.string_optional('Phone').max(11),
            Address: JoiSchema.string_optional('Address').max(256),
            Scope: JoiSchema.string_required('User role')
        }
    },
    users_userid_patch: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        params: {
            UserId: JoiSchema.string_required('User ID')
        },
        query: false,
        payload: {
            FirstName: JoiSchema.string_optional('First name'),
            LastName: JoiSchema.string_optional('Last name'),
            IsActive: JoiSchema.boolean_optional('Is Active'),
            Email: JoiSchema.string_optional('Email address').email(),
            Phone: JoiSchema.string_optional('Phone').max(11),
            Address: JoiSchema.string_optional('Address').max(256),
            Scope: JoiSchema.string_optional('User role')
        }
    }
};


