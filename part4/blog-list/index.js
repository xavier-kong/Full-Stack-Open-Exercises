const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require('morgan')

const server = http.createServer(app)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'))

morgan.token('req', function(req) {
  return JSON.stringify(req.body)
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})