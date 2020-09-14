import { getUserRoutes } from '../modules/users';

function getRoutes(router) {
  router.use('/users', getUserRoutes());
  return router;
}

export default getRoutes;
