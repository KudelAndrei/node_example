import Joi from 'joi';
import { MIN_LENGTH, MAX_LENGTH } from './validation.config';

export default Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(MIN_LENGTH).max(MAX_LENGTH),
});
