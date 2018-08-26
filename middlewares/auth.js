const logger = require('./../lib/loggerLib')
const response = require('./../lib/responseLib')

let isAuthenticated = (req, res, next) => {
  if (req.params.authToken || req.query.authToken || req.header('authToken')) {
    if(req.params.authToken=="Admin" || req.query.authToken=="Admin" || req.header('authToken')=="Admin"){
      req.user = {fullName:'Admin',userId:'Admin'}
      next();
    }
    else{
      logger.error('Incorrect authentication token', 'Authentication Middleware', 5)
      let apiResponse = response.genrate(true, 'Incorrect authentication token', 403, null)
      res.send(apiResponse)
    }
  } else {
    logger.error('Authentication Token Missing', 'Authentication Middleware', 5)
    let apiResponse = response.genrate(true, 'Authentication Token Is Missing In Request', 403, null)
    res.send(apiResponse)
  }
}



module.exports = {
  isAuthenticated: isAuthenticated
}
