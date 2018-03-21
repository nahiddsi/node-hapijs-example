'use strict';

const CronJob = require('cron').CronJob;
const Logger = global.requireUtil('logger');
const UserService = global.requirePlugin('users').services.UserService;
const Utility = global.requireUtil('utility');

module.exports = new CronJob({
    cronTime: '00 30 01 01 * *',
    onTick: function () {

        Logger.info('Cron:calculation-dues: Job has initiated.');
        UserService.getList({ Scope: 'member' })
            .then((users) => {

                Logger.info(`Cron:calculation-dues: found ${users.length} numbers of users to calculate`);
                const TotalAmount = Utility.getTotal();
                users.forEach((user) => {

                    UserService.patch(user._id, { CurrentDueAmount: TotalAmount - user.TotalPaidAmount })
                        .then(({ _id }) => {

                            Logger.info(`Cron:calculation-dues: Upadated payment dues for user: ${_id}`);
                        })
                        .catch((err) => {

                            Logger.error(`Cron:calculation-dues: Error while trying to update user: ${err}`);
                            throw err;
                        });
                });
            })
            .catch((err) => {

                Logger.error(`Cron:calculation-dues: Error while fetching user list: ${err}`);
                throw err;
            });
    }
});
