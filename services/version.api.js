import * as applicationConfig from '../configs/application.config';

const versionApi = ctx => ctx.request.header[(applicationConfig.version_api_header_key).toLowerCase()];

export default versionApi;
