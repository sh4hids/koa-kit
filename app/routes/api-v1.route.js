const env = process.env.NODE_ENV || 'development';
const { apiVersion } = require('../config')[env];
const { userRoute } = require('../modules/users');

module.exports = router => {
  router.use(`/${apiVersion}/`, require('../modules/api/v1'));
  router.use(`/${apiVersion}/users`, userRoute);
};
