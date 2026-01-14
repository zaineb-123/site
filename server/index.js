import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/db.js'
import { login } from './services/auth.js';
import authRoutes from './routes/user.routes.js';
connectToDatabase()
const app = express();
app.use(cors());
app.use(express.json())
app.use('/login',authRoutes)


app.listen(process.env.PORT,()=>{
    console.log('serveur runnning')
})
    
