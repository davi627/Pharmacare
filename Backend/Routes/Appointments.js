import express from 'express'
import { Appointment } from '../Models/Appointments.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send email notification
const sendEmailNotification = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email sending error:', error);
    }
};

// Post new appointment
router.post('/appointments', async (req, res) => {
    const { name, age, gender, date, reason, email } = req.body;
    try {
        const appointment = new Appointment({
            name,
            age,
            gender,
            date,
            reason,
            email
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve appointment route
router.post('/approve', async (req, res) => {
    const { id, status } = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        if (appointment) {
            // Send email notification
            await sendEmailNotification(
                appointment.email, 
                'Appointment Approved', 
                `Dear ${appointment.name},\n\nYour appointment on ${appointment.date} has been approved,Kindly be on time.\n\nBest regards,\nPharmacare Clinic`
            );

            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to approve appointment' });
    }
});

// Reschedule appointment route
router.post('/reschedule', async (req, res) => {
    const { id, newDate } = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            id, 
            { date: newDate, isRescheduled: true }, 
            { new: true }
        );

        if (appointment) {
            
            await sendEmailNotification(
                appointment.email, 
                'Appointment Rescheduled', 
                `Dear ${appointment.name},\n\nYour appointment has been rescheduled to ${newDate}.\n\nBest regards,\nPharmacare Clinic`
            );

            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to reschedule appointment' });
    }
});

export { router as appointmentRouter }