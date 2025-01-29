import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../modals/user.js';
const router = Router();
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log('Request body:', req.body);
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user instance
        const newUser = new User({
            username: name,
            email,
            password: hashedPassword, // Use the correct field name based on your schema
        });
        // Save the user to the database
        await newUser.save();
        //  res.status(201).json({ message: 'User registered successfully!' });
        res.status(200).json({ message: 'registration successful' });
    }
    catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
});
router.get('/', async (req, res) => {
    const used = await User.find();
    console.log(used);
    res.render('register');
});
export default router;
