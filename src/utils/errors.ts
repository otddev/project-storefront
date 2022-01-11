import type { NextFunction, Request, Response } from 'express'
import { logger } from '../logger/winston'

export class ErrorAPI {
  error!: string
  status: number
  data: unknown

  constructor(error: string, status = 500, data: unknown = null) {
    this.error = error
    this.status = status
    this.data = data
  }
}

export const handle = (err: Error) => {
  logger.error(err)
  process.exitCode = 1
  process.kill(process.pid, 'SIGTERM')
}

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const err: ErrorAPI = new ErrorAPI('Page Not Found', 404)
  next(err)
}

export const ErrorHandler = (
  err: NodeJS.ErrnoException | ErrorAPI,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let e = err

  if (!(err instanceof ErrorAPI)) {
    e = new ErrorAPI(
      'An unknown error has occurred.',
      500,
      JSON.stringify(err.message)
    )
    logger.log({
      level: 'exception',
      message: err.message
    })
  }
  res.status((e as ErrorAPI).status).send({ error: e })
}
