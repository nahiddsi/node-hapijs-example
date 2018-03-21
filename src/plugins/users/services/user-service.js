'use strict';

const User = require('../models/users');
const Utility = global.requireUtil('utility');
const UserScope = global.requireUtil('user-scope');

module.exports = {
    getList: function (criteria) {

        return User.find(Utility.convertCriteriaToLikeType(criteria, ['IsActive']));
    },
    get: function (userId) {

        return User.findById(userId);
    },
    post: function (userInfo) {

        userInfo.CurrentDueAmount = Utility.getTotal();
        return new User(userInfo).save();
    },
    patch: function (userId, userInfo) {

        return User.findByIdAndUpdate(
            userId, userInfo,
            { new: true, runValidators: true });
    },
    delete: function (userId) {

        return User.findByIdAndRemove({ _id: userId });
    },
    getByUsername: function (username) {

        return User.findOne({ Username: username });
    },
    addPayment: function (userId, paymentInfo) {

        return User.findByIdAndUpdate(
            userId, { $inc: { TotalPaidAmount: paymentInfo.PaymentAmount, CurrentDueAmount: -1 * paymentInfo.PaymentAmount }, $push: { PaymentHistory: paymentInfo } },
            { new: true, runValidators: true });
    },
    getUserListByDues: function (criteria) {

        criteria.Scope = UserScope.MEMBER;
        return User.find(Utility.convertCriteriaToLikeType(criteria, ['Scope'])).sort({ CurrentDueAmount: -1 });
    }
};
