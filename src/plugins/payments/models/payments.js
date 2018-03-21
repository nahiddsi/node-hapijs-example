'use strict';

const Mongoose = require('mongoose');
const UserService = global.requirePlugin('users').services.UserService;
const Logger = global.requireUtil('logger');

const paymentSchema = new Mongoose.Schema({

    PaymentAmount: { type: Number, required: true },
    PaymentDate: { type: Date, required: true, default: Date.now(), index: true },
    SubmittedBy: { type: String, required: true, index: true },
    SubmittedFor: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    SubmitterNote: { type: String }

});

paymentSchema.pre('save', function (next) {

    UserService.addPayment(this.SubmittedFor, this)
        .then((userInfo) => {

            Logger.info(`payments: added payment history on user: ${userInfo}`);
            next();
        })
        .catch((err) => {

            Logger.error(`Error while trying to add payment history on user: ${err}`);
            throw err;
        });
});

module.exports = Mongoose.model('Payment', paymentSchema);
