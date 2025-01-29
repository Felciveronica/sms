import mongoose, { Schema } from 'mongoose';
const userschema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
export default mongoose.model('User', userschema, 'user');
