import 'dotenv/config'
import express  from "express"
import connectdb from "./Connection/connectdb.js"
import cors from "cors"
import verifyJwt from "./middleware/verifyJwt.js"
import useAuth from "./routes/auth.js"
import useOrganization from "./routes/organization.js"
import useholiday from "./routes/holiday.js"
const app = express()


 
connectdb()
app.use(express.json())

app.use(cors({
    origin:process.env.corsFrontend,
    credentials: true    
}))

 

app.use("/auth",useAuth)
app.use("/ogranization",verifyJwt,useOrganization)
app.use("/holiday",verifyJwt,useholiday)


 

 
app.listen(process.env.PORT,()=>console.log(`Server Listen Port ${process.env.PORT}`))


