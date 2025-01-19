import express from 'express'
import { Appointment } from '../Models/Appointments.js'

const router = express.Router()

// post all appointments
router.post('/appointments',async(req,res)=>{
    const {name,age,gender,date,reason}=req.body;
    try {
        const appointment=new Appointment({
            name,
            age,
            gender,
            date,
            reason
        })
        await appointment.save();
        res.status(201).json(appointment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'})
        
    }
})

export {router as appointmentRouter}