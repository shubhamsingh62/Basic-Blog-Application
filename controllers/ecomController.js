const express = require('express')
const route = require('./../routes/ecom')
const response = require('./../lib/responseLib')
const mongoose = require('mongoose')
const shortId = require('shortid')

const prodModel = mongoose.model('prod')

let addProduct = (req,res) =>{
   let today = Date.now();
   let prodId = shortId.generate()

   let newProd = new  prodModel({
       prodId:prodId,
       prodName:req.body.prodName,
       price:req.body.price,
       material:req.body.material,
       weight:req.body.weight,
       rating:req.body.rating,
       quantity:req.body.quantity,
       warranty:req.body.warranty,
       category:req.body.category,
       created:today,
       lastModified:today

   })
   let color = (req.body.color!= undefined && req.body.color != null && req.body.color != '')?req.body.color.split(','):[]
 newProd.color = color; 

 let service = (req.body.service!= undefined && req.body.service!=null && req.body.service!='')?req.body.service.split(','):[]
   newProd.service=service;
let paymentMethod = (req.body.paymentMethod!= undefined && req.body.paymentMethod!=null && req.body.paymentMethod!='')?req.body.paymentMethod.split(','):[]
newProd.paymentMethod=paymentMethod;

newProd.save( (err,result)=>{
    if(err){
        console.log(err)
        res.send(err);
    }else{
        console.log('add product successfully');
        res.send(result);
    }
      
})

}

let getAllProduct = (req,res)=>{
    prodModel.find()
             .select('-_V -_id')
             .lean()
             .exec((err,result)=>{
                 if(err){
                     console.log(err);
                     res.send(err)
                 }else if(result === undefined || result === null || result.length === 0){
                     console.log("not found any product");
                     res.send("product not found")
                 }else{
                     console.log("all product are");
                     res.send(result);
                 }
             })
}

let editProduct = (req,res)=>{
    let option = req.body
    prodModel.update({'prodId':req.params.prodId},option,{multi:true}).exec((err,result)=>{
        if(err){
            console.log(err);
            res.send(err)
        }else if(result === undefined || result === null || result.length === 0){
            console.log("not found any product");
            res.send("product not found")
        }else{
            console.log("all product are updated");
            res.send(result);
        }
    })
}

let deleteProduct = (req,res)=>{
    prodModel.remove({'prodId':req.params.prodId},(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else if(result === undefined || result === null || result.length === 0){
            console.log("not found any product with this id");
            res.send("product not found with this id")
        }else{
            console.log("product removed");
            res.send(result);
        } 
    })
}

let viewByProductId = (req,res)=>{
    prodModel.findOne({'prodId':req.params.prodId},(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else if(result === undefined || result === null || result.length === 0){
            console.log("not found any product with this id");
            let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse)
        }else{
            console.log("product found");
            res.send(result);
        } 

    })
}

let viewByCategory = (req,res)=>{
    let cat = req.params.category
    if( cat === undefined || cat === null || cat === ''){
        console.log("valid category should be passed");
        res.send('valid category should be passed ');
        
    }else{
        prodModel.find({'category':req.params.category},(err,result)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else if(result === undefined || result === null || result.length === 0){
                console.log("not found any product in this category");
                res.send("product not found in this category")
            }else{
                console.log("category found");
                res.send(result);
            } 
        })
    }
}

let viewByProdName = (req,res)=>{
    let prod = req.params.prodName;
    if( prod === undefined || prod === null || prod === ''){
        console.log("valid category should be passed");
        res.send('valid category should be passed ');
        
    }else{
        prodModel.find({'prodName':req.params.prodName},(err,result)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else if(result === undefined || result === null || result.length === 0){
                console.log("not found any product with this name");
                res.send("product not found with that name")
            }else{
                console.log("category found");
                res.send(result);
            } 
        })
    }

}


let addToCart = (req,res)=>{
    prodModel.findOneAndUpdate({'prodId':req.params.prodId},{'itemIsInCart':true},{new:true},(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else if(result === undefined || result === null || result.length === 0){
            console.log("not found any product  in cart");
            res.send("product not found with that name in cart")
        }else{
            console.log("item found in cart");
            res.send(result);
        } 
    })
}

let deleteFromCart = (req,res) =>{
    
    prodModel.findOneAndUpdate({'prodId':req.params.prodId},{'itemIsInCart':false},{new:true},(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else if(result === undefined || result === null || result.length === 0){
            console.log("not found any product  in cart");
            res.send("product not found with that name in cart")
        }else{
            console.log("item remove cart");
            res.send(result);
        } 
    })
    
}

 

module.exports={
    getAllProduct:getAllProduct,
    addProduct:addProduct,
    editProduct:editProduct,
    deleteProduct:deleteProduct,
    viewByProductId:viewByProductId,
    viewByCategory:viewByCategory,
    viewByProdName:viewByProdName,
    addToCart:addToCart,
    deleteFromCart:deleteFromCart
    
}