import express from 'express';
import userRouter from './routes/userRouter.js';
import path from 'path';
import mongoose from 'mongoose';
import register from './routes/register.js';
import login from './routes/login.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url'; // Import this utility
// Get the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/studentManagement')
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(err => { console.log(err); });
app.use('/login', login);
app.use('/register', register);
app.use('/user', userRouter);
app.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.clearCookie('userdata', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    // res.status(200).json({ message: 'Logged out successfully' });
    res.redirect('/login');
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
