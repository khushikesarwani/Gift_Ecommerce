// const express= require ('express');
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";  //giving extensions is imp in es6
import morgan from "morgan";
import colors from 'colors'; 
import cors from 'cors';

import  authroutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import {fileURLToPath} from 'url';

//configure env
dotenv.config()

//database config
connectDB();

const app=express();
//es module fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//middleware---------------------------
app.use(cors({origin: true, credentials: true})); 
app.use(express.json());   //using this instead of body parser
app.use(morgan('dev'));    //tells us which api is fetched
app.use(express.static(path.join(__dirname, './client/build')));

//Routes----------------
app.use("/api/v1/auth",authroutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

//================REST API================

app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

const PORT=process.env.PORT ||8080;



    app.listen(PORT, () => {
        console.log("server is listening for requests");
    });

