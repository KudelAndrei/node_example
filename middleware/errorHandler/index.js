import logger from '../../logger';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(`\n Error request ${JSON.stringify(ctx.request)} \n ${err.stack} \n`);
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
