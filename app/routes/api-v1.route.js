const env = process.env.NODE_ENV || 'development';
const { apiVersion } = require('../config')[env];
const { userRoute } = require('../components/users');

module.exports = router => {
  router.use(`/${apiVersion}/`, require('../components/api/v1'));
  router.use(`/${apiVersion}/users`, userRoute);
};
