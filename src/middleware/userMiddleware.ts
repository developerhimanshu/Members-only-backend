import { body } from 'express-validator';
import User from '../models/users'


export const validateSignUpForm = [
    body('userName')
        .trim()
        .isLength({min:3}).withMessage("Username must be at least 3 characters"),
    body('firstName')
        .trim()
        .isLength({min:3}).withMessage("First name must be at least 3 characters")
        .isAlpha().withMessage("First name must contain only letters"),

    body('lastName')
        .trim()
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .isAlpha().withMessage('Last name must contain only letters'),
    
    body('confirmPassword')
        .trim()
        .custom((value, {req})=>{
            if(value !== req.body.password){
                throw new Error("Password confirmation does not match password");
            }
            return true;
        })
    
]

export const userExistMiddleware = async(req, res, next)=>{
    try{
        const user = await User.findOne({userName:req.body.userName});
        if(user){
            return res.status(500).json({
                error:"User already exists"
            })
        }
        next()
    }catch(err){

    }
}

