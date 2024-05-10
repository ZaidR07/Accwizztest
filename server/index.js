import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

import { Grouprouter } from "./routes/Group.js";
import { Loginrouter } from "./routes/Login.js";


const DB = process.env.DB;
const app = express();
const PORT = 4000;


app.use(cors({
  origin: ['http://localhost:3000','https://test-liart-six-77.vercel.app'],  
  credentials: true
}));



app.use(express.json());


app.use(express.static('public'));
app.use(Grouprouter);
app.use(Loginrouter);





mongoose.connect(DB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log("Connected to database")
    })                                                              
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });