const { authRoute } = require('../modules/auth');

module.exports = router => {
  router.use('/auth', authRoute);
};
