const CONFIG = require('../config');

module.exports = router => {
  router.prefix(`/${CONFIG.apiVersion}`);
  router.use('/', require('../components/api/v1'));
  router.use('/users', require('../components/users'));
};
