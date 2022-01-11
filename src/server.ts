import express from 'express'
import 'express-async-errors'
import { createHttpTerminator } from 'http-terminator'
import bodyParser from 'body-parser'
import { handle, NotFound, ErrorHandler } from './utils/errors'
import { logger, express_api_error, express_api_logger } from './logger/winston'
import routes from './routes/default'
import { config } from './utils/config_init'

export const app: express.Application = express()

process.on('unhandledRejection', (err) => {
  throw err
})

process.on('uncaughtException', (err) => {
  handle(err)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express_api_logger)

app.use('/api', routes)

app.use([NotFound])

app.use(express_api_error)

app.use([ErrorHandler])

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`server started | port: ${config.port} | mode: ${config.env}`)
})

const kill = createHttpTerminator({ server })
const shutdown = ['SIGTERM', 'SIGINT']

shutdown.forEach((signal) =>
  process.on(signal, async () => {
    logger.info(`${signal} received, service closing gracefully ...`)
    await kill.terminate()
  })
)

export default app
