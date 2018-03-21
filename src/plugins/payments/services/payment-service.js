'use strict';

const Payment = require('../models/payments');
const Utility = global.requireUtil('utility');

module.exports = {

    getList: function (userId, criteria) {

        const queryPromise = Payment.find({ SubmittedFor: userId });
        if (criteria.SubmittedBy) {
            queryPromise.where('SubmittedBy').equals(Utility.convertElementToLikeElement(criteria.SubmittedBy));
        }
        if (criteria.PaymentFromDate) {
            queryPromise.where('PaymentDate').gt(criteria.PaymentFromDate);
        }
        if (criteria.PaymentToDate) {
            queryPromise.where('PaymentDate').lt(criteria.PaymentToDate);
        }
        return queryPromise;
    },
    post: function (userId, paymentInfo) {

        paymentInfo.SubmittedFor = userId;
        return new Payment(paymentInfo).save();
    },
    getStatistics: function (criteria) {

        const queryPromise = Payment.find({});
        if (criteria.FromDate) {
            queryPromise.where('PaymentDate').gt(criteria.FromDate);
        }
        if (criteria.ToDate) {
            queryPromise.where('PaymentDate').lt(criteria.ToDate);
        }
        return queryPromise;
    }
};
