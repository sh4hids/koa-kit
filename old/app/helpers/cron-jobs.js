const { CronJob } = require('cron');
const { authController } = require('../modules/auth');

const deleteExpiredToken = new CronJob(
  '0 */1 * * * *',
  authController.deleteExpiredToken
);

module.exports = { deleteExpiredToken };
