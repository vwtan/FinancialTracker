const path = require('path')

module.exports = {
  CLIENT_ENTRY:  path.join(process.cwd(), 'client/index.js'),
  CLIENT_OUTPUT: path.join(process.cwd(), 'build'),
  SERVER_ENTRY:  path.join(process.cwd(), 'server/server.js'),
  SERVER_OUTPUT: path.join(process.cwd(), 'build'),
  SERVER_PORT: 3005,
  PUBLIC_PATH: '/'
}
