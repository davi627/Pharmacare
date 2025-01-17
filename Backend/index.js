import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { UserRouter } from './Routes/Authentication.js'
import { ProductsRouter } from './Routes/Products.js'
import { mpesaRoutes } from './Routes/Mpesa.js'
import { transactionRoutes } from './Routes/Transaction.js'
import { appointmentRouter } from './Routes/Appointments.js'
import { PrescriptionRouter } from './Routes/Prescriptions.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, 
}))
//handling the multer upload
app.use('/uploads', express.static('uploads'));


//Importing routes
app.use("/Auth",UserRouter)
app.use('/Products',ProductsRouter)
app.use('/mpesa', mpesaRoutes)
app.use('/transactions', transactionRoutes);
app.use('/appointments',appointmentRouter)
app.use('/prescriptions',PrescriptionRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to MONGODB'))
.catch((err)=>console.error("mongo connection error:",err))

const PORT = process.env.PORT||3000

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))