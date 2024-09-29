import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // base config
  NODE_ENV: Joi.string()
    .valid('localhost', 'development', 'test', 'production')
    .required(),
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^\d+[hd]$/)
    .required(),
  CORS_ALLOWED_ORIGINS: Joi.string()
    .pattern(/^(https?:\/\/)/)
    .required(),
  // database config
  POSTGRES_PRISMA_URL: Joi.string().required(),
  // Add more environment variables here
}).meta({ className: 'validation' });
