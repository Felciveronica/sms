import mongoose,{Schema} from 'mongoose';

interface userinter 
{
    username : String,
    email : String,
    password : string
}

const userschema = new Schema({
     
    username:{ type:String, required :true},
    email :{type :String, required :true, unique :true},
    password :{type:String, required :true}

})

export default mongoose.model<userinter>('User', userschema,'user');
export {userinter};
