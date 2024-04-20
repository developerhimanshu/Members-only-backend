import { connectToDB } from "./db";
import * as dotenv from 'dotenv'

import {validateSignUpForm, userExistMiddleware } from "./middleware/userMiddleware";
import {authMiddleware} from "./middleware/authorizeMiddleware";

import User from './models/users'
import { validationResult } from "express-validator";
const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


dotenv.config()
connectToDB()
app.post("/signup",validateSignUpForm, userExistMiddleware, async(req, res)=>{
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		if(!errors.isEmpty()){
			return res.status(400).json({
				errors:errors.array()
			})
		}
	}
	const {userName, firstName, lastName, password} = req.body;
	let user = {}
	try{
		 const salt = await bcrypt.genSalt(10);

		 const hashedPassword = await bcrypt.hash(password, salt);
		 user = await User.create({userName, firstName, lastName, password:hashedPassword});

		 const token = jwt.sign({userName:userName}, process.env.JWT_SECRET, {expiresIn: '1h'})
		 return res.status(200).json({token:token});
	}catch(err){
		console.error('Error signing up:', err);
        throw err;
	}
})

app.get('/joinclub',authMiddleware, (req, res)=>{
	res.send("Welcome to the club!");
})

app.listen(3000, ()=>{
	console.log("Server is up and running");
})
