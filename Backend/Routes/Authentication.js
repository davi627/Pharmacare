import express, { Router } from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { User } from '../Models/Authentication'
const app = express()

Router.post('/Register',async(req,res)=>{
    const {email,password,confirmPassword}=req.body;
    if(!email ||!password ||!confirmPassword){
        return res.status(400).json({error:'All fields are required'})
    }
    try {
        //Checking if passwords match
        if(password!==confirmPassword){
            return res.status(400).json({error:'Passwords do not match'})
        }
        //Checking if email already exists
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({error:'Email already exists'})
        }
        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10)
        //Creating a new user
        const user = new User({email,password:hashedPassword})
        await user.save()
        res.status(201).json({message:'User registered successfully'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Server Error'})
        
    }
})