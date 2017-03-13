const env = {
  VERSION : "0.0.1",
  APP_ENV : process.env.NODE_ENV,
  APP_MODE: process.env.APP_MODE || process.env.NODE_ENV
}

module.exports = env

