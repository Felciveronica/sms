// import express, { Request, Response, Router } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../modals/user.js'
// const SECRET_KEY = 'your_secret_key'; // Replace with a secure key
// const router = express.Router();
// router.post('/login', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
//     const { email, password } = req.body;
//     const user =    User.find((u:String) => u.email === email);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });
//     // Generate a JWT token
//     const token = jwt.sign({ id: user.id, email: email }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
// });
// export default router;
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/user.js'; // Adjust the path based on your project structure
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variables for security
const router = express.Router();
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user in the database
        const user = await User.findOne({ email });
        console.log(user); // For Mongoose or similar ORM
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
        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        //  res.json({ token });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('userdata', user._id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log("login token =", token);
        console.log("login user id ===", user._id);
        res.status(200).json({ message: 'Login successful' });
        // res.redirect('/user');
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
router.get('/', (req, res) => {
    res.render('login');
});
export default router;
