import Joi from 'joi';
import register from './register.schema';
import * as httpCodes from '../../configs/http.code.config';
import ValidError from './valid.error';

const getMessagesByKey = (message, element) => [
  ...(message[element.context.key] ? message[element.context.key] : []),
  element.message.indexOf(element.context.key) !== -1 && element.message,
];

module.exports = {
  validate: async (schema, ctx) => {
    const isQueryExist = Object.keys(ctx.request.query).length !== 0;
    const value = Object.assign(isQueryExist ? ctx.request.query : {}, ctx.request.body);
    const result = Joi.validate(value, schema, { abortEarly: false });
    if (result && result.error !== null) {
      const message = {};
      result.error.details.forEach((element) => {
        message[element.context.key] = getMessagesByKey(message, element);
      });
      throw new ValidError(httpCodes.BAD_REQUEST, message);
    }
    return true;
  },
  schemas: {
    register,
  },
};
