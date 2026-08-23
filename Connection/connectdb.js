import mongoose from "mongoose"
import dns from "dns";
 
let MONGODB_URI = process.env.Url_db


dns.setServers(['8.8.8.8', '1.1.1.1']);
async function connectdb(){
    await mongoose.connect(MONGODB_URI).then(()=>console.log("mongoo Connected  ✅")).catch((err)=>console.log(err))

}


export default connectdb
