import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User } from '../Models/Authentication.js'
const app = express()
const router=express.Router()

router.post('/Register', async (req, res) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Log the incoming role to verify it is being received
        console.log('Register Role:', role);

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        //Restricting Registration of multiple admins
        if (role === 'Admin') {
            const adminExists = await User.findOne({ role: 'Admin' });
            if (adminExists) {
                return res.status(400).json({ error: 'An Admin is already registered' });
            }
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(
               {
                 email,
                  password: hashedPassword,
                   confirmPassword,
                    role 
                });

        // Log the user object before saving to verify all fields
        console.log('Saving user:', user);

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});


//Login route

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email, role });
        console.log('User found:', user);  // Log the full user object

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({ message: 'Logged in successfully',role: user.role, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});



export  {router as UserRouter}