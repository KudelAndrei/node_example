import * as HttpCodes from '../../configs/http.code.config';

class ValidError extends Error {
  constructor(code = 400, message = 'Valid Error') {
    super();
    this.status = code;
    this.message = message;
  }
}

export default ValidError;
