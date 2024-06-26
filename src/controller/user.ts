import { validationResult } from "express-validator";
import User from "../models/users";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

export const signupUser = async(req, res)=>{
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
}