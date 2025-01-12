import cookieParser from 'cookie-parser';
import cors from 'cors'; //connection
import { config } from "dotenv";
import express from 'express';
import fileUpload from 'express-fileupload'; //fileupload kae liae
import connectToDb from './db/db.js';
import { errorMiddleware } from './middlewares/error.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
config({path:'./config/config.env'})

const app=express();
// const connectToDb=require('./db/db');

app.use(cors({
    origin:['http://localhost:4000',process.env.FRONTEND_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}
)); //for development only 
// app.get('/api/v1,user', (req, res) => {
//     res.send('Hello World!')
//     })
console.log(process.env.DB_CONNECT)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true})); //'Content-Type': 'application/x-www-form-urlencoded', setting content-type by default
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:"/tmp/"
    }
)) 


    app.use('/api/user',userRouter)
    app.use('/api/application',applicationRouter)
    app.use('/api/job',jobRouter)
// cookie-parser is written before express.json

//multer can also be used
connectToDb();

// middleware always on end else face error:
app.use(errorMiddleware)
export default app;