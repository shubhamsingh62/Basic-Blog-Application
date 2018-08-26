const response = require('./../lib/responseLib')

let errorHandler = (err,req,res,next)=>{
    console.log("some error occured at globle level");
    console.log(err);
    let apiResponse=response.genrate(false,'some error occured at globle level',500,null)
    res.send(apiResponse);
}

let notFoundHandler = (req,res,next)=>{
    console.log("globle not found handler called ")

   let apiResponse=response.genrate(false,'route not found handler',404,null)
    res.status(404).send(apiResponse);
}

module.exports={
   globleErrorHandler:errorHandler,
   globleNotFoundHandler:notFoundHandler
}