import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Customer','Admin','Pharmacist'],
        required:true
    }

})

const UserModel=mongoose.model('User',userSchema)
export{UserModel as User}