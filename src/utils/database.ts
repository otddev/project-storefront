import { Pool } from 'pg'
import { loadDBConfig } from './config_load'
import Joi from 'joi'

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
    PG_HOST: Joi.string().when('NODE_ENV', { is: 'dev', then: Joi.required() }),
    PG_DB: Joi.string().when('NODE_ENV', { is: 'dev', then: Joi.required() }),
    PG_USER: Joi.string().when('NODE_ENV', { is: 'dev', then: Joi.required() }),
    PG_PASS: Joi.string().when('NODE_ENV', { is: 'dev', then: Joi.required() }),
    PGT_HOST: Joi.string().when('NODE_ENV', {
      is: 'test',
      then: Joi.required()
    }),
    PGT_DB: Joi.string().when('NODE_ENV', { is: 'test', then: Joi.required() }),
    PGT_USER: Joi.string().when('NODE_ENV', {
      is: 'test',
      then: Joi.required()
    }),
    PGT_PASS: Joi.string().when('NODE_ENV', {
      is: 'test',
      then: Joi.required()
    })
  })
  .unknown()

const env = loadDBConfig(schema)
let client: Pool = new Pool()

if (env.NODE_ENV === 'dev') {
  client = new Pool({
    host: env.PG_HOST,
    database: env.PG_DB,
    user: env.PG_USER,
    password: env.PG_PASS
  })
}

if (env.NODE_ENV === 'prod') {
  client = new Pool({
    host: env.PGP_HOST,
    database: env.PGP_DB,
    user: env.PGP_USER,
    password: env.PGP_PASS
  })
}

if (env.NODE_ENV === 'test') {
  client = new Pool({
    host: env.PGT_HOST,
    database: env.PGT_DB,
    user: env.PGT_USER,
    password: env.PGT_PASS
  })
}
export default client
