import { connectToDB } from "./db";
import * as dotenv from 'dotenv'

import {validateSignUpForm, userExistMiddleware } from "./middleware/userMiddleware";
import {authMiddleware} from "./middleware/authorizeMiddleware";

import User from './models/users'
import { validationResult } from "express-validator";
import userRoute from "./routes/users";
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

dotenv.config()
connectToDB()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", userRoute) 	


app.get('/joinclub',authMiddleware, (req, res)=>{
	res.send("Welcome to the club!");
})

app.listen(3000, ()=>{
	console.log("Server is up and running");
})
