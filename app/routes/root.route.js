const { authRoute } = require('../components/auth');

module.exports = router => {
  router.use('/auth', authRoute);
};
