import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

const authenticateToken = (req: Request, res: Response, next: NextFunction):void => {

    const token = req.cookies.token;
    console.log("token =",token);
    if (!token)  res.status(401).json({ message: 'Access Denied. No token provided.' });
    else{
    try {
        const user = jwt.verify(token, SECRET_KEY); // Verify token
        // req.user = user; 
        next(); 
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}
};

export default authenticateToken;