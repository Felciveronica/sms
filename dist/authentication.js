import jwt from 'jsonwebtoken';
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key
// Middleware to check authentication
const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // console.log("header =", req.headers)
    // console.log("authentication header =",authHeader);
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    const token = req.cookies.token;
    console.log("token =", token);
    if (!token)
        res.status(401).json({ message: 'Access Denied. No token provided.' });
    else {
        try {
            const user = jwt.verify(token, SECRET_KEY); // Verify token
            // req.user = user; // Attach user information to the request object
            next(); // Proceed to the next middleware or route
        }
        catch (err) {
            res.status(403).json({ message: 'Invalid token' });
        }
    }
};
export default authenticateToken;
