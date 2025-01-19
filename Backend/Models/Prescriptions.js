import mongoose from 'mongoose'

const prescriptionsSchema = new mongoose.Schema({
    patientsName:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:false
    }

})

const PrescriptionsModel= mongoose.model('Prescriptions',prescriptionsSchema)

export{PrescriptionsModel as Prescriptions}