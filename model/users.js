import mongoose from "mongoose";

const UserSechma = new  mongoose.Schema({
    
    cin :{type: String},
    nom : {type:String},
    prenom : {type:String},
    password : {type:String},
    
},{timestamps:true})

const User = mongoose.model('user__test', UserSechma)
export default User
