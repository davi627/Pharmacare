import mongoose from 'mongoose'

const appointmentShema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true
    }

})

const AppointmentModel = mongoose.model('Appointments', appointmentShema)

export {AppointmentModel as Appointment}