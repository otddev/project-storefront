import winston from 'winston'
import expressWinston from 'express-winston'

const levels = {
  levels: {
    exception: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
    exception: 'yellowBG'
  }
}

winston.addColors(levels.colors)

const level = () => {
  const env = process.env.NODE_ENV || 'dev'
  const isDevelopment = env === 'dev'
  return isDevelopment ? 'debug' : 'warn'
}

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({
    filename: 'logs/all.log'
  })
]

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: false }),
  winston.format.json(),
  winston.format.printf(
    (info) => `$[${info.timestamp} ${info.level}: ${info.message}`
  )
)

export const logger = winston.createLogger({
  level: level(),
  levels: levels.levels,
  format,
  transports
})

export const express_api_logger = expressWinston.logger({
  meta: true,
  statusLevels: true,
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}} {{res.responseTime}}ms',
  format: format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/debug.log' })
  ]
})

export const express_api_error = expressWinston.errorLogger({
  level: 'error',
  meta: true,
  dynamicMeta: (req, res) => {
    if (res.statusCode === 200 || res.statusCode === null) {
      res.statusCode = 500
    }
    return { res }
  },
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}} {{res.responseTime}}ms | Error: {{err}}',
  format: format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log' })
  ]
})
