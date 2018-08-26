const express = require('express');

const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../lib/responseLib')
const check = require('./../lib/checkLib')
const logger = require('./../lib/loggerLib')
const BlogModel = mongoose.model('Blog');

let getAllblog = (req , res)=>{
    BlogModel.find()
             .select('-_V -_id')
             .lean()
             .exec((err, result)=>{
                 if(err){
                    logger.error(err.message, 'Blog Controller: getAllBlog', 10)
                    let apiResponse = response.genrate(false,'some error occured',500,null);
                    res.send(apiResponse)
                 }else if(check.isEmpty(result)){
                    logger.info('No Blog Found', 'Blog Controller: getAllBlog')
                     console.log('no blog found');
                     let apiResponse = response.genrate(false,'data not found',404,null);
                     res.send(apiResponse)

                 }else{
                    let apiResponse = response.genrate(true,'succesfully find all blog',200,result);
                      res.send(apiResponse);
                 }

             })
}

let viewByCategory = (req, res) => {

    if (check.isEmpty(req.params.category)) {

        console.log('category should be passed')
        let apiResponse = response.genrate(true, 'CategoryId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.find({ 'category': req.params.category }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.genrate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blogs Not Found.')
                let apiResponse = response.genrate(true, 'Blogs Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blogs Found Successfully')
                let apiResponse = response.genrate(false, 'Blogs Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}
let viewByAuthor = (req, res) => {

    if (check.isEmpty(req.params.author)) {

        console.log('author should be passed')
        let apiResponse = response.generate(true, 'author is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.find({ 'author': req.params.author }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.genrate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blogs Not Found.')
                let apiResponse = response.genrate(true, 'Blogs Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blogs Found Successfully')
                let apiResponse = response.genrate(false, 'Blogs Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


let viewByBlogId = (req ,res)=>{
    BlogModel.findOne({'blogId':req.params.blogId},(err,result)=>{
        if(err){
            logger.error(err.message, 'Blog Controller: viewByBlogId', 10)
            console.log(err)
            let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Blog Found', 'Blog Controller: viewByBlogId')
            console.log('data not found');
            let apiResponse = response.genrate(false,'data not found',404,null);
            res.send(apiResponse)
        }else{
            let apiResponse = response.genrate(true,'succesfully viwed',200,result);
             res.send(apiResponse);
        }
    })
}

let createBlog = (req,res)=>{
  var today = Date.now()
  let blogId = shortid.generate();

  let newBlog = new BlogModel({
    blogId:blogId,
    title:req.body.title,
    description:req.body.description,
    bodyHtml:req.body.blogBody,
    isPublished:true,
    category:req.body.category,
    author:req.body.fullName,
    created:today,
    lastModified:today
 })

 let tags = (req.body.tags!= undefined && req.body.tags != null && req.body.tags != '')?req.body.tags.split(','):[]
 newBlog.tags = tags;

 newBlog.save((err,result)=>{
     if(err){
         console.log(err);
         logger.error(err.message, 'Blog Controller: createBlog', 10)
         let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse);
     }else{
        let apiResponse = response.genrate(true,'succesfully blog created',200,result);
        res.send(apiResponse);
     }
 })
}

let editBlog = (req,res)=>{
    let options = req.body;
   BlogModel.update({'blogId':req.params.blogId},options,{multi:true}).exec((err,result)=>{
    if(err){
        logger.error(err.message, 'Blog Controller: editBlog', 10)
        console.log(err)
        let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse)
    }else if(check.isEmpty(result)){
        logger.info('No Blog Found', 'Blog Controller: editBlog')
        console.log('data not found');
        let apiResponse = response.genrate(false,'data not found',404,null);
            res.send(apiResponse)
    }else{
        let apiResponse = response.genrate(true,'succesfully blog edited',200,result);
        res.send(apiResponse);
    }
   })

}

let increaseBlogView = (req,res)=>{
    BlogModel.findOne({'blogId':req.params.blogId},(err,result)=>{
        if(err){
            logger.error(err.message, 'Blog Controller: increaseBlogView', 10)
            console.log(err)
            let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Blog Found', 'Blog Controller: increaseBlogView')
            console.log('data not found');
            let apiResponse = response.genrate(false,'data not found',404,null);
            res.send(apiResponse)
        }else{
            result.views +=1;
            result.save((err,result)=>{
                if(err){
                    console.log(err);
                    let apiResponse = response.genrate(false,'some error occured',500,null);
                     res.send(apiResponse)
                }else{
                    console.log("blog update sucessfully");
                    let apiResponse = response.genrate(true,'succesfully blog updated',200,result);
                    res.send(apiResponse);
                }
            })
        }

    })
}

let deleteBlog = (req,res)=>{
    BlogModel.remove({'blogId':req.params.blogId},(err,result)=>{
        if(err){
            logger.error(err.message, 'Blog Controller: deleteBlog', 10)
            console.log(err)
            let apiResponse = response.genrate(false,'some error occured',500,null);
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Blog Found', 'Blog Controller: deleteBlog')
            console.log('data not found');
            let apiResponse = response.genrate(false,'data not found',404,null);
            res.send(apiResponse)
        }else{
            let apiResponse = response.genrate(true,'succesfully blog deleted',200,result);
        res.send(apiResponse);
        }  

    })
}




module.exports ={    
    getAllblog:getAllblog,
    viewByBlogId:viewByBlogId,
    createBlog:createBlog,
    editBlog:editBlog,
    increaseBlogView:increaseBlogView,
    deleteBlog:deleteBlog,
    viewByAuthor:viewByAuthor,
    viewByCategory:viewByCategory
}