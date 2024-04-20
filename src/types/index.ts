import {Types } from "mongoose"

export interface IUser{
    firstName: string
    lastName: string
    username:string
    password:string
    membershipStatus:Boolean
}

export interface IMessage{
    user:Types.ObjectId;
    title:string;
    message:string;

}