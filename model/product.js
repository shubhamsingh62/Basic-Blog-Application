const mongoose = require('mongoose')
 const Schema = mongoose.Schema


 let listProd = new Schema(
    {
        prodId:{
            type:String,
            unique:true
        },
        prodName:{
            type:String,
            default:'not Avilable'
        },
        price:{
            type:String,
            default:''
        },
        color:[],
        material:{
            type:String,
            default:'Not avilable'
        },
        weight:{
            type:String,
            default:''
        },
        rating:{
            type:Number,
            default:''
        },
        service:[],
        paymentMethod:[],
        warranty:{
            type:String,
            default:'no warranty on this product'
        },
        category:{
          type:String,
          default:'not in any category'
        },
        itemIsInCart:{
            type:Boolean,
            default:false
        },
        quantity:{
           type:Number,
           default:1
        },
        created:{
            type:Date,
            default:Date.now
        },
        lastModified:{
            type:Date,
            default:Date.now
        }

    }

 )
 mongoose.model('prod',listProd);