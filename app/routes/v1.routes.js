const { apiVersion } = require('../config');
const { jwt, errorHandler } = require('../helpers/jwt');
const { userRoute } = require('../modules/users');
const { todoRoute } = require('../modules/todos');

module.exports = router => {
  router.use(`${apiVersion}/`, require('../modules/api/v1'));
  router.use(`${apiVersion}/users`, userRoute);
  router.use(`${apiVersion}/todos`, todoRoute);
};
