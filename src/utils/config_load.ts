import dotenv from 'dotenv'
import type { Schema } from 'joi'
import { handle } from './errors'

export const loadConfig = (schema: Schema) => {
  dotenv.config()

  const { value, error } = schema.validate(process.env)
  if (error) {
    handle(new Error(`Invalid Environment: ${error.message}`))
  }
  return value
}

export const loadDBConfig = (schema: Schema) => {
  dotenv.config()

  const { value, error } = schema.validate(process.env)
  if (error) {
    handle(new Error(`Invalid Environment Database Config: ${error.message}`))
  }
  return value
}
