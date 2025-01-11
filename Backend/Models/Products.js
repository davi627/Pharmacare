import mongoose from 'mongoose'

const ProductsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    expiry:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:false
    },
    image:{
        type:String,
        required:false
    }
})

const ProductsModel= mongoose.model('Products',ProductsSchema)

export{ProductsModel as Products}