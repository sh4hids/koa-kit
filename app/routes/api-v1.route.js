const env = process.env.NODE_ENV || 'development';
const { apiVersion } = require('../config')[env];
const { userRoute } = require('../components/users');
const { jwt, errorHandler } = require('../helpers/jwt');
// app.use(errorHandler()).use(jwt());

module.exports = router => {
  router.use(errorHandler()).use(jwt());
  router.use(`/${apiVersion}/`, require('../components/api/v1'));
  router.use(`/${apiVersion}/users`, userRoute);
};
