

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/user.js'; // Adjust the path based on your project structure

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variables for security

const router = express.Router();

router.post('/', async (req: Request, res: Response):Promise<void>  => {
    const { email, password } = req.body;

    try {
    
        const user = await User.findOne({ email }); 
        console.log(user)
        if (!user) {
             res.status(404).json({ message: 'User not found' });
             return;
        }

        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
             res.status(401).json({ message: 'Invalid Password' });
             return;
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        //  res.json({ token });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('userdata',user._id , { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log("login token =",token)
        console.log("login user id ===",user._id)
        res.status(200).json({ message: 'Login successful' });
        // res.redirect('/user');
         return;
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: 'Internal Server Error' });
         return;
    }
});

router.get('/', (req:Request, res: Response) => {
    res.render('login')
});

export default router;
