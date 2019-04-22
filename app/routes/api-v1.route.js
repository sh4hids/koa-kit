const env = process.env.NODE_ENV || 'development';
const { api } = require('../config');
const { jwt, errorHandler } = require('../helpers/jwt');
const { userRoute } = require('../modules/users');
const { todoRoute } = require('../modules/todos');

module.exports = router => {
  router.use(`${api}/`, require('../modules/api/v1'));
  router.use(`${api}/users`, userRoute);
  router.use(`${api}/todos`, todoRoute);
};
