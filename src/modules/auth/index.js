const TokenBlacklist = require('./token-blacklist.model');
const authController = require('./auth.controller');
const authRoute = require('./auth.route');

module.exports = {
  TokenBlacklist,
  authController,
  authRoute,
};
