const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const blog=require('./models/Blog')
const bodyParser = require('body-parser')
const globleErrorHandler = require('./middlewares/appErrorHandler')
const routeLogger = require('./middlewares/routeLogger')
const helmet=require('helmet')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(globleErrorHandler.globleErrorHandler)
app.use(routeLogger.logIp)
app.use(helmet())

let modelPath='./models'
fs.readdirSync(modelPath).forEach(function(file){
    if(-file.indexOf('.js'))
    console.log(modelPath+'/'+file)
    require(modelPath+'/'+file);

})

let routePath = './routes'
fs.readdirSync(routePath).forEach(function(file){
    if(-file.indexOf('.js'))
     console.log("read file diretory");
     console.log(routePath+'/'+file)
    let route = require(routePath+'/'+file)
    route.setRouter(app);

})

app.use(globleErrorHandler.globleNotFoundHandler)


app.listen(appConfig.port, () =>{
 console.log('Example app listening on port 3000!')
  
//   let db = 
  mongoose.connect(appConfig.db.uri,{ useNewUrlParser: true });
})


 mongoose.connection.on('error', function(err){
     console.log(" database connection error");
    console.log(err);
 });

mongoose.connection.on('open', function(err){
    if(err){
    console.log("error occured");
    console.log(err);
    }
    else{
        console.log("database connection open succes");
    }

});