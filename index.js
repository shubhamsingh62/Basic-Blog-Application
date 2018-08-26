const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routeLogger = require('./middlewares/routeLogger')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routeLogger.logIp)

let modelPath = './model'
fs.readdirSync(modelPath).forEach(function(file){
    if (-file.indexOf('.js'))
    console.log(modelPath+'/'+file)
    require(modelPath+'/'+file)
});


let routePath = './routes'

fs.readdirSync(routePath).forEach(function(file){
    if(-file.indexOf('.js'))
    console.log(routePath+'/'+file)

    let route = require(routePath+'/'+file);
    route.setRouter(app)
})



app.listen(appConfig.port, () =>{
    console.log('Example app listening on port 3000!')
     
   //   let db = 
     mongoose.connect(appConfig.db.uri,{ useNewUrlParser: true });
   })


   // handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler