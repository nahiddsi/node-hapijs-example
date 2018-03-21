'use strict';

const Joi = require('joi');
const JoiSchema = global.requireUtil('joi-schema');

module.exports = {
    paymentdues_get: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        payload: false,
        query: {
            Username: JoiSchema.string_optional('User name'),
            FirstName: JoiSchema.string_optional('User first name'),
            LastName: JoiSchema.string_optional('User last name'),
            Email: JoiSchema.string_optional('User email address'),
            Phone: JoiSchema.string_optional('Phone')
        }
    },
    users_payments_get: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        payload: false,
        params: {
            UserId: JoiSchema.string_required('User ID')
        },
        query: {
            PaymentFromDate: JoiSchema.date_optional('Payment From Date'),
            PaymentToDate: JoiSchema.date_optional('Payment To Date'),
            SubmittedBy: JoiSchema.string_optional('Submitted By')
        }
    },
    users_payments_post: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        query: false,
        params: {
            UserId: JoiSchema.string_required('User ID')
        },
        payload: {
            PaymentAmount: JoiSchema.number_required('Payment Amount').min(0),
            PaymentDate: JoiSchema.date_optional('Payment Date'),
            SubmittedBy: JoiSchema.string_required('Submitted By'),
            SubmitterNote: JoiSchema.string_optional('Special note')
        }
    },
    financial_statistics_get: {
        headers: Joi.object({
            Authorization: JoiSchema.string('Valid temporary auth token')
        }).options({ allowUnknown: true }),
        params: false,
        payload: false,
        query: {
            FromDate: JoiSchema.date_optional('From Date'),
            ToDate: JoiSchema.date_optional('To Date')
        }
    }
};


