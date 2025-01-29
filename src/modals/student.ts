import mongoose,{Schema} from 'mongoose';
import User,{userinter} from './user.js'

interface studentinter
{
    name:String;
    email:String;
    phone : Number;
    RegistrationNumber : String;
    createdBy : userinter

}

const studentschema = new Schema({
     name: {type:String , required :true},
     email :{type :String, required :true, unique :true},
     phone : {type :Number, required :true},
     RegistrationNumber : {type :String, required :true, unique:true},
     createdBy : {type : Schema.Types.ObjectId, ref : 'User'}

})

export default mongoose.model<studentinter>('Student',studentschema,'student')