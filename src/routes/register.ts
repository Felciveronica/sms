import express from 'express';
import {Router, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../modals/user.js'

interface RegisterRequestBody {
   name: string;
   email: string;
   password: string;
 }
 
const router =  Router();

router.post('/', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {


   const { name, email, password } = req.body;

  try {
    console.log('Request body:', req.body);


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      username:name,
      email,
      password: hashedPassword, 
    });

 
    await newUser.save();

   //  res.status(201).json({ message: 'User registered successfully!' });
   res.status(200).json({ message: 'registration successful' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

router.get('/',async (req,res) => {
   const used = await User.find();
    console.log(used);
   res.render('register')
});

export default router;