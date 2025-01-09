import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { UserRouter } from './Routes/Authentication.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, 
}))


//Importing routes
app.use("/Auth",UserRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to MONGODB'))
.catch((err)=>console.error("mongo connection error:",err))

const PORT = process.env.PORT||3000

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))