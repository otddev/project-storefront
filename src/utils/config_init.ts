import { loadConfig } from './config_load'
import Joi from 'joi'

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
    PORT: Joi.number().port().default(3000),
    BCRYPT_PEPPER: Joi.string().min(5).max(20).required(),
    BCRYPT_SALT: Joi.number().positive().default(10),
    TOKEN_SECRET: Joi.string().alphanum().min(3).max(30).required()
  })
  .unknown()

const env = loadConfig(schema)

export const config = {
  env: env.NODE_ENV as 'dev' | 'test' | 'prod',
  port: env.PORT as number,
  pepper: env.BCRYPT_PEPPER as string,
  salt: env.BCRYPT_SALT,
  secret: env.TOKEN_SECRET
}
