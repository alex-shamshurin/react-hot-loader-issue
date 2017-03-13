/**
 * Routes for express app
 */

export default (app) => {
   
  app.get('/', function (req, res, next) {
    next()
  })

  app.get('*', function (req, res, next) {
   require('../../public/assets/server').default(req, res)
  })
}
                            
