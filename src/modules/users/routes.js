import Router from 'koa-router';

const router = new Router();
// const controller = require('./user.controller');

function getAllUsers() {
  return [
    { id: 1, name: 'Shahid' },
    { id: 2, name: 'Shafu' },
  ];
}

function getUserRoutes() {
  router.get('/', getAllUsers);
}

export default getUserRoutes;
