const env = process.env.NODE_ENV || 'development';
const CONFIG = require('../config')[env];
const { userRoute } = require('../components/users');
const { authRoute } = require('../components/auth');

module.exports = router => {
  router.prefix(`/${CONFIG.apiVersion}`);
  router.use('/', require('../components/api/v1'));
  router.use('/auth', authRoute);
  router.use('/users', userRoute);
};
