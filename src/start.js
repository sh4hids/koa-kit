import Koa from 'koa';
import Router from 'koa-router';
import logger from 'loglevel';
import Cors from '@koa/cors';
import BodyParser from 'koa-bodyparser';
import getRoutes from './routes';
import { errorMiddleware } from './middlewares';
import { setupCloseOnExit } from './utils';

function startServer({ port = process.env.PORT } = {}) {
  const app = new Koa();
  const router = new Router();

  app.use(Cors());
  app.use(
    BodyParser({
      enableTypes: ['json'],
      jsonLimit: '5mb',
      strict: true,
      onerror(err, ctx) {
        ctx.throw('body parse error', 422);
      },
    })
  );

  app.use(errorMiddleware);

  app.use('/api', getRoutes(router));
  app.use(router.routes());
  app.use(router.allowedMethods());

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      setupCloseOnExit(server);
      resolve(server);
    });
  });
}

export default startServer;
