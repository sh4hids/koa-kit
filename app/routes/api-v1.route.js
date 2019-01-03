const env = process.env.NODE_ENV || 'development';
const { apiVersion } = require('../config')[env];
const { jwt, errorHandler } = require('../helpers/jwt');
const { userRoute } = require('../modules/users');
const { todoRoute } = require('../modules/todos');

module.exports = router => {
  router.use(`/${apiVersion}/`, require('../modules/api/v1'));
  router
    .use(errorHandler())
    .use(jwt())
    .use(`/${apiVersion}/users`, userRoute);
  router
    .use(errorHandler())
    .use(jwt())
    .use(`/${apiVersion}/todos`, todoRoute);
};
