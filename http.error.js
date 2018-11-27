import * as HttpCodes from './configs/http.code.config';

class HttpError extends Error {
  constructor(code = 500, message = 'Message Error') {
    super();
    const isExsistHttpCode = Object.values(HttpCodes).find(value => value === code);

    if (isExsistHttpCode) {
      this.status = code;
      this.message = message;
    } else {
      throw new HttpError(500, `This HttpCode(${code}) not found`);
    }
  }
}

export default HttpError;
