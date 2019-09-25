import joi from '@hapi/joi';

export default {
  payload: joi.object({
    path: joi.string(),
    route: joi.string(),
  })
};
