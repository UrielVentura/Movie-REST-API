import Joi from 'joi';

export const createMovieSchema = Joi.object({
  name: Joi.string().required(),
});
