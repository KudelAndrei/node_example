import * as HttpCodes from '../../configs/http.code.config';
import logger from '../../logger';

export default (ctx) => {
  logger.info(`Get url: ${ctx.request.url}, method: ${ctx.request.method}`);
  ctx.status = HttpCodes.OK;
};
