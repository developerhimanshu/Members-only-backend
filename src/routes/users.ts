import { signupUser } from "../controller/user";
import { userExistMiddleware, validateSignUpForm } from "../middleware/userMiddleware";

const express = require('express');

const userRoute = express.Router();

userRoute.post('/signup',validateSignUpForm, userExistMiddleware, signupUser);

export default userRoute;