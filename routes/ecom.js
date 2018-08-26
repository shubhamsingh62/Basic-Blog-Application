const express = require('express')
const ecomController = require('./../controllers/ecomController')
const appConfig = require('./../config/appConfig')

let setRouter = (app)=>{
    baseUrl=appConfig.apiVersion+'/ecom';
    
    app.post(baseUrl+'/product/create',ecomController.addProduct);
    app.get(baseUrl+'/product/all',ecomController.getAllProduct);
    app.put(baseUrl+'/product/:prodId/update',ecomController.editProduct);
    app.post(baseUrl+'/product/:prodId/delete',ecomController.deleteProduct);
    app.get(baseUrl+'/product/:prodId',ecomController.viewByProductId);
    app.get(baseUrl+'/product/view/by/category/:category',ecomController.viewByCategory);
    app.get(baseUrl+'/product/view/by/name/:prodName',ecomController.viewByProdName);
    app.put(baseUrl+'/cart/:prodId/addToCart',ecomController.addToCart);
    app.put(baseUrl+'/cart/:prodId/removed/cart',ecomController.deleteFromCart);


}

module.exports={
    setRouter:setRouter
}