import Koa from 'koa';
import { config } from 'dotenv';
import mount from 'koa-mount';
import routes from './middleware/routes';
import * as applicationConfig from './configs/application.config';
import logger from './logger';
import errorHandler from './middleware/errorHandler';
import resultHandler from './middleware/resultHandler';
import cors from '@koa/cors';

config();

const env = applicationConfig.node_env;
const serverPort = applicationConfig.server_port;

const app = new Koa();

app.use(cors());
app.use(errorHandler);
app.use(mount('/api', routes()));
app.use(resultHandler);


app.listen(serverPort, () => {
  logger.info(`Server has benn started on PORT ${serverPort} in ${env} `);
});
