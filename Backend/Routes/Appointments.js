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
//Getting the appointments

router.get('/appointments',async(req,res)=>{
    try {
        const appointments=await Appointment.find();
        res.json(appointments);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'})
        
    }
})

//approving the appointment

router.post('/approve', (req, res) => {
    const { id, status } = req.body;
    Appointment.updateOne({ _id: id }, { status })
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).json({ error: 'Failed to approve appointment' }));
  });
  


//rescheduling the appointment

router.post('/reschedule', (req, res) => {
    const { id, newDate } = req.body;
    Appointment.updateOne({ _id: id }, { date: newDate })
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).json({ error: 'Failed to reschedule appointment' }));
  });
  

export {router as appointmentRouter}